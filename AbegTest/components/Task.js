import React from 'react';
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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Alarm from '../assets/images/alarm-clock.svg';


const Task = ({ task, handleComplete, ...props }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ ...styles.title, textDecorationLine: task?.completed ? 'line-through' : 'none'}}>{task?.title}</Text>
          <View style={{ height: 7, width: 7, borderRadius: 7, backgroundColor: task?.type === 'important' ? '#fd929f' : '#5b3da4' }} />
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
          <Alarm height={15} width={15} style={{ marginRight: 5 }}/>
          {task && <Text style={styles.labelStyle}>{new Date(task?.date).toDateString()}</Text>}
        </View>
      </View>
      <View>
        <BouncyCheckbox
          size={25}
          fillColor="#5b3da4"
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: "#f1f3f5" }}
          onPress={task?.completed ? null : () => handleComplete(task)}
          isChecked={task?.completed}
          disabled={task?.completed}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#f1f3f5',
    borderWidth: 1,
    backgroundColor: '#f7f8fa',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginRight: 10,
    color: '#2d2445'
  },
  labelStyle: {
    color: '#372f4f',
    fontSize: 12,
    paddingBottom: 5,
  },
});

export default Task;