import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { completeTask, loadTasks } from '../store/tasks/actions';
import DefaultProfile from '../assets/images/default-img.jpeg';
import Task from "../components/Task";

const HomeScreen = () => {
  const STORAGE_KEY = '@tasks'
  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state.tasks);
  const [allTasks, setAllTasks] = useState([...tasks])
  const [selectedFilter, setSelectedFilter] = useState('all')

  useEffect(() => {
    setAllTasks(tasks)
    if(tasks.length > 0){
      updateStorage() 
    }
  }, [tasks])


  const updateStorage = async () => {
    try {
      const tasksObj = JSON.stringify([...tasks])
      await AsyncStorage.setItem(STORAGE_KEY, tasksObj)
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  useEffect(async () => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
    const arr = JSON.parse(data)
      if (arr && arr.length > 0) {
        dispatch(loadTasks(arr))
      }
    })
  },[])

  const filterAllTasks = (mode) => {
    switch (mode) {
      case 'important':
        setSelectedFilter(mode)
        return setAllTasks([...tasks].filter(item => item.type === 'important'))
      case 'planned':
        setSelectedFilter(mode)
        return setAllTasks([...tasks].filter(item => item.type === 'planned'))
      default:
        setSelectedFilter(mode)
        return setAllTasks([...tasks])
    }
  }

  const updateTask = (task) => {
    dispatch(completeTask(task.id))
  }

  const filters = [
    {
      name: 'My Day',
      value: 'all'
    },
    {
      name: 'Important',
      value: 'important'
    },
    {
      name: 'Planned',
      value: 'planned'
    },
  ]

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: 20, color: '#767386', }}>Hello,</Text>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>John Capital</Text>
        </View>
        <Image source={DefaultProfile} style={styles.photoStyle}/>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 15}}>
        {
          filters.map(filter => (
            <TouchableOpacity 
              style={{ ...styles.defaultType, backgroundColor: filter.value === selectedFilter ? '#5a3ea4' : '#f7f8fa' }} 
              key={filter.value} 
              onPress={() => filterAllTasks(filter.value)}
            >
              <Text style={{ color: filter.value === selectedFilter ? '#ffffff' : '#372f4f', fontWeight: '600' }}>{filter.name}</Text>
            </TouchableOpacity>
          ))
        }
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.labelStyle}>Tasks</Text>
        <View>
          {allTasks.length > 0 ? allTasks?.filter(item => item.completed !== true).map(task => (
            <Task key={task.id} task={task} handleComplete={updateTask}/>
          ))
          :
          <Text style={{ textAlign: 'center', color: '#bbbbbb', marginTop: 20 }}>No Tasks Available</Text>
          }
        </View>

        <Text style={styles.labelStyle}>Completed</Text>
        <View>
          {allTasks.length > 0 ? allTasks?.filter(item => item.completed === true).map(task => (
            <Task key={task.id} task={task}/>
          ))
          :
          <Text style={{ textAlign: 'center', color: '#bbbbbb', marginTop: 20 }}>No Completed Tasks Available</Text>
          }
        </View>
      </ScrollView>
    </View>
  )
}

const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: 25,
    paddingTop: 50,
  },
  scrollContainer: {
    marginTop: 20
  },
  photoStyle: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
  labelStyle: {
    color: '#372f4f',
    fontSize: 15,
    paddingBottom: 5,
    marginTop: 15,
  },
  defaultType: {
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    borderRadius: 12,
    marginRight: 10
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafc',
    padding: 15,
    borderRadius: 20,
    width: '100%',
    marginTop: 15,
  },
  textStyle: {
    color: '#372f4f',
  }
});

export default HomeScreen;
