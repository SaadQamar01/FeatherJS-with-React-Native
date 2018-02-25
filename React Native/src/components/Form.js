import React, { Component } from 'react';
// import store from './../store/index.js';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import client from './../../feathers';
import Dashboard from './../container/Dashboard.js'
export default class TransactionForm extends Component {
    constructor() {
        super();
        this.state = {
            controller: '',
            lane_name: '',
            AVI_tag: '',
            vehicle_weight: '',
            vehicle_axles: '',
            // date: "",
        }
    }
    componentDidMount() {
        client.service('avi-data').on('created', data =>console.log(data));
    }
    submit() {
        TransactionDetails = {
            // AVI_tag: this.state.AVI_tag,
            // alprstatus_sent:null,
            // controller: this.state.controller,
            // country_state:"",
            // createdAt:"2018-02-25T16:42:53.000Z",
            // creationtime:"2018-02-25T06:08:20.000Z",
            // extra1:null,
            // extra2:null,
            // flags:null,
            // hotlist_id:0,
            // imagestatus_sent:null,
            // lane_direction:1,
            // lane_name: 1,
            // match_id:null,
            // match_status:null,
            // plate_confidence:0,
            // plate_number:1,
            // rate:0,
            // review_done:null,
            // review_id:null,
            // transaction_id:1519535300414177,
            // vehicle_axles: 12,
            // vehicle_class:6,
            // vehicle_speed:77,
            // vehicle_weight:1111,
            
AVI_id
:
"21",
AVI_tag
:
"0x0000ABBD0000000000203222",
anteanna_id
:
null,
controller
:
"PORSTS",
createdAt
:
"2018-02-25T02:50:00.000Z",
cross_lane_read
:
"9",
handshake
:
"8",
loop_val
:
"11",
transaction_id
:
"1519525751064777",
updatedAt
:
"2018-02-25T02:50:51.000Z",
        }
        console.log(TransactionDetails)
        
        client.service('avi-data').create(TransactionDetails).then(result => {
            console.log('transaction created! ',result);
            Actions.Dashboard();
          }).catch((error) => {
            console.log('ERROR creating transaction');
            console.log(error);
          });
    }
    render() {

        return (
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Controller</Label>
                        <Input onChangeText={(controller) => this.setState({ controller })} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Lane Name</Label>
                        <Input onChangeText={(lane_name) => this.setState({ lane_name })} />
                    </Item>
                    <Item floatingLabel >
                        <Label>Avi Tag</Label>
                        <Input onChangeText={(AVI_tag) => this.setState({ AVI_tag })} />
                    </Item>
                    <Item floatingLabel >
                        <Label>Vehicle Weight</Label>
                        <Input onChangeText={(vehicle_weight) => this.setState({ vehicle_weight })} />
                    </Item>
                    <Item floatingLabel >
                        <Label>Vehicle Axles</Label>
                        <Input onChangeText={(vehicle_axles) => this.setState({ vehicle_axles })} />
                    </Item>

                    <Button active info full onPress={this.submit.bind(this)}>
                        <Text>Submit</Text>
                    </Button>
                </Form>
            </Content>
        );
    }
}