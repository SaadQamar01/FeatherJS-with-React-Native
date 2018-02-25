import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';

export default class Todoitem extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View style={styles.list} key={this.props.keyval}>
        <Text style={styles.todoList}><Text>Date: </Text>{this.props.val.createdAt}</Text>
        <Text style={styles.todoList}><Text>Avi tag: </Text>{this.props.val.AVI_tag}</Text>
        <Text style={styles.todoList}><Text>Controller: </Text>{this.props.val.controller+" "}{this.props.val.lane_name}</Text>
        {/* <TouchableOpacity style={styles.deleteList} onPress={this.props.deleteMethod}>
        <Text style={styles.deleteListText}>D</Text>
        </TouchableOpacity> */}
      </View>
    )
  }
}
const styles = StyleSheet.create({
    list:{
        position:'relative',
        padding:20,
        paddingRight:50,
        borderBottomWidth:2,
        borderBottomColor:'#ededed' 
    },
    todoList:{
        paddingLeft:20,
        borderLeftWidth:10,
        borderLeftColor:'#E91E63'
    },
    deleteList:{
        position:'absolute',
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:'#2980b9',
        padding:10,
        top:10,
        bottom:10,
        right:10
    },
    deleteListText:{
      color:'white'
    }
});

