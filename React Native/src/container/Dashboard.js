import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import store from './../store/index.js';
import client from './../../feathers';

import {
    Container, Header, Title, Content, Footer, FooterTab, Icon,
    List, ListItem, Left, Right, Body, Fab, Tab, Tabs, TabHeading, Badge
} from 'native-base';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Todoitem from './../components/Node.js';
import TransactionForm from './../components/Form.js';
const windowSize = require('Dimensions').get('window')
const deviceWidth = windowSize.width;
const deviceHeight = windowSize.height;
var checkBackButton = true;
var lat;
var long;
// function mapStateToProps(state) {
//     return {
//         requestsData: state.reducerRequests,
//     };
// }
function mapStateToProps(state) {
    return {
        requestsData: state.reducerRequests,
    };
}
class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            allData: [],
            noteText: ''
        }
    }
    componentWillMount(){
       var allData = client.service('avi-data')
       allData.find()
        .then(response => {console.log(response.data);this.setState({allData:response.data})})
        .catch(err=>console.log(err))
        allData.on('created', data => this.setState({
            allData: this.state.allData.concat(data)
          }));
    }
    logout() {
        client.logout();
        Actions.Login();
    }
    addTodo() {
        // if (this.state.noteText) {
        //     var d = new Date();
        //     this.state.noteArray.push({ 'date': d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + (d.getDate()), 'note': this.state.noteText })
        //     this.setState({ noteArray: this.state.noteArray })
        //     this.setState({ noteText: '' });
        // }

    }
    // deleteNote(key) {
    //     this.state.allData.splice(key, 1);
    //     this.setState({ noteArray: this.state.noteArray });
    // }
    render() {
        let notes = this.state.allData.map((val, key) => {
            return <Todoitem key={key} keyval={key} val={val} deleteMethod={() => this.deleteNote(key)} />
        });
        return (
            <View style={styles.container}>
                <Header style={{ backgroundColor: '#E91E63', borderBottomWidth: 10, borderBottomColor: '#ddd', height: 90 }}>
                    <Body style={{}}>
                        <Title>FeatherJS</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={() => this.logout()}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Log out</Text>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.addButton} onPress={()=> Actions.TransactionForm()}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.textInput}></Text>               
                </View>
            </View>
        )
    }
}
export default connect(mapStateToProps)(Dashboard)



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: '#E91E63',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    footer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0
    },
    addButton: {
        backgroundColor: '#E01E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        marginBottom: -55,
        zIndex: 10
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        paddingTop: 46,
        backgroundColor: '#252525',
        borderTopWidth: 10,
        borderTopColor: '#ededed',
    }
});