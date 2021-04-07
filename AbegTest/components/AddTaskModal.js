import React, { useState } from 'react';
import { 
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Switch,
  Platform
} from "react-native";
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import { addNewTask } from '../store/tasks/actions';
import Add from '../assets/images/add-task.svg';
import Clock from '../assets/images/wall-clock.svg';
import Calendar from '../assets/images/calendar.svg';

const AddTaskModal = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [alarm, setAlarm] = useState(false)

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleChange = (text) => {
    setTitle(text)
  }

  const toggleAlarm = (value) => {
    setAlarm(value)
  }

  const showMode = (currentMode) => {
    setShowDate(true);
    setMode(currentMode);
  };

  const showDateTimepicker = (mode) => {
    showMode(mode);
  };

  const taskTypes = [
    {
      name: 'Important',
      value: 'important',
    },
    {
      name: 'Planned',
      value: 'planned',
    }
  ]

  const createNewTask = () => {
    const payload = {
      id: tasks.length + 1,
      title, 
      type, 
      alarmEnabled: alarm, 
      date,
      completed: false,
    }

    if(title === '' || type === ''){
      return;
    }
    dispatch(addNewTask(payload))
    setShowModal(false)
    setTitle('')
    setType('')
    setShowDate(false);
  }

  return (
    <>
      <Add height={40} width={40} style={styles.addBtnStyle} onPress={() => {setShowModal(true)}} />

      <View style={styles.container}>
        <Modal
          backdropOpacity={0.2}
          isVisible={showModal}
          onBackdropPress={() => setShowModal(false)}
          style={styles.contentView}
        >
          <View style={styles.content}>
            <Text style={styles.header}>Create a task</Text>
            
            <View style={styles.formContainer}>
              <View style={styles.formSection}>
                <Text style={styles.labelStyle}>Task title</Text>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={handleChange}
                  value={title}
                />
              </View>
              <View style={styles.formSection}>
                <Text style={styles.labelStyle}>Task type</Text>
                <View style={{ flexDirection: 'row' }}>
                {
                  taskTypes.map(tasktype => (
                    <TouchableOpacity 
                      style={{ ...styles.defaultType, backgroundColor: tasktype.value === type ? '#5a3ea4' : '#f7f8fa' }} 
                      key={tasktype.value} 
                      onPress={() => setType(tasktype.value)}
                    >
                      <Text style={{ color: tasktype.value === type ? '#ffffff' : '#372f4f', fontWeight: '600' }}>{tasktype.name}</Text>
                    </TouchableOpacity>
                  ))
                }
                </View>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.labelStyle}>Choose date & time</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity 
                      style={{...styles.dateTime, flexDirection: 'row', backgroundColor: '#f7f8fa', alignItems: 'center'}} 
                      onPress={() => showDateTimepicker('date')}
                    >
                      <Calendar height={30} width={30} style={{ marginRight: 10 }} />
                      <Text style={{ color: '#372f4f', fontWeight: '600' }}>Select a date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={{...styles.dateTime, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f7f8fa'}} 
                      onPress={() => showDateTimepicker('time')}
                    >
                      <Clock height={20} width={20} style={{ marginRight: 10 }} />
                      <Text style={{ color: '#372f4f', fontWeight: '600' }}>Select Time</Text>
                    </TouchableOpacity>
                </View>
                {showDate && ( 
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                      style={{ width: '35%', marginTop: 5}}
                    />
                    <Text>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</Text>
                </View>
                  )}
              </View>

              <View style={{...styles.formSection, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: '#372f4f', fontWeight: '600' }}>Get alert for this task</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#5a3ea4" }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleAlarm}
                  value={alarm}
                />
              </View>
            </View>

            <TouchableOpacity style={{...styles.buttonStyle, ...styles.addBtnStyle }} onPress={createNewTask}>
              <Text style={{ color: '#ffffff' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  )
}

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
  },
  addBtnStyle: {
    shadowColor: '#f8e0e5',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 1,
    shadowRadius: 5
  },
  header: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center' 
  },
  formContainer: {
    marginTop: 15
  },
  formSection: {
    marginTop: 35
  },
  labelStyle: {
    color: '#372f4f',
    fontSize: 13,
    paddingBottom: 5,
  },
  inputStyle: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#f7f8fa',
    borderWidth: 1,
    borderColor: '#f1f3f5',
  },
  defaultType: {
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    borderRadius: 12,
    marginRight: 10
  },
  dateTime: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    borderRadius: 15,
    marginRight: 10
  },
  content: {
    backgroundColor: '#ffffff',
    height: height - 250,
    padding: 22,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fd93a1',
    padding: 15,
    borderRadius: 12,
    width: '100%',
    marginTop: 25,
  },
})

export default AddTaskModal;
