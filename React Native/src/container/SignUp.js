import React, { Component } from 'react';
import store from './../store/index.js';
import { connect } from 'react-redux';
import MiddlewareAuthentication from './../store/middleWares/middlewareAuthentication.js';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text,Icon } from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import Dashboard from './Dashboard.js';
import { Actions } from 'react-native-router-flux';
import Login from './Login';
import client from './../../feathers';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Alert,
  ToastAndroid,
  Dimensions
} from 'react-native';
function mapStateToProps(state) {
  return {
    isSignin: state.reducerSignup,
  };
}
class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      Name: '',
      Email: '',
      Password: '',
      mode:(Dimensions.get('window').width<Dimensions.get('window').height)?'verticle':'horizontal'
    }
  }

  login() {
    // const { email, password } = this.state;

    // return client.authenticate({
    //   strategy: 'local',
    //   email, password
    // }).catch(error => Alert.alert("login "+error));
  }
  submit() {
    var Name = this.state.Name;
    var email = this.state.Email;
    var password = this.state.Password;
    if(Name==''||email==''||password==""){
      Alert.alert("Please fill all requirements")
    }
    else{
      return client.service('users')
      .create({ email, password })
      .then((res) => Alert.alert("submit then ",res))
      .catch((err)=>Alert.alert("submit ",err))
    // Details={
    //  Name :Name,
    //  Email :Email,
    //  Password :Password,
    // }
    // store.dispatch(MiddlewareAuthentication.asyncSignup(Details));
    // if(this.props.isSignin==true){
    //   Actions.Dashboard();
    //   this.props.isSignin=false;
    // }


    // const auth = firebase.auth();
    // auth.createUserWithEmailAndPassword(Email, Password)
    //   .then(data => {
    //     Alert.alert('Signup Successfully')
    //     Actions.Dashboard()
    //   })
    //         .catch((error) => {
    //                 alert(JSON.stringify(error.message));
    //     })
    }
  }
    componentWillMount(){
    Dimensions.addEventListener('change',()=> 
    this.setState({mode:(Dimensions.get('window').width<Dimensions.get('window').height)?'verticle':'horizontal'}));
  }
      componentWillUnmount() {
        Dimensions.removeEventListener('change',()=> 
    this.setState({mode:(Dimensions.get('window').width<Dimensions.get('window').height)?'verticle':'horizontal'}));
    }
  render() {
    return (
        //     <Image source={require('../Images/bg2.jpg')}
        // style={styles.backgroundImage}>
        <Container style={{backgroundColor:'#222222cf'}}>
        <ScrollView>
          {this.state.mode=='verticle'?    
            <Image  style={{borderRadius:70,height:80,width:80,top:'10%',left:'40%',zIndex:10}} source={require('../Images/logo.png')} />
           :  <Image  style={{borderRadius:70,height:110,width:110,top:'12%',left:'40%',zIndex:10}} source={require('../Images/logo.png')} />
          }
        <Content style={styles.container}>
    { this.state.istrue? <Spinner color='blue' /> : 
          <Form>
            <Item floatingLabel>
              <Label style={{marginLeft:10}}>Name:</Label>
              <Input onChangeText={(Name) => this.setState({ Name })} />
            </Item>
            <Item floatingLabel>
              <Label style={{marginLeft:10}}>Email:</Label>
              <Input onChangeText={(Email) => this.setState({ Email })} />
            </Item>
            <Item floatingLabel>
              <Label style={{marginLeft:10}}>Password:</Label>
              <Input secureTextEntry={true} password={true} onChangeText={(Password) => this.setState({ Password })} />
            </Item>
            <Button active info full onPress={this.submit.bind(this)} style={styles.submit}>
              <Text style={{fontWeight: 'normal',color:'white'}} uppercase={false}>Submit</Text>
            </Button>
            <Button active info full  autoCapitalize = 'none' onPress={() => Actions.Login()} style={styles.back}>
              <Text style={{fontWeight: 'normal',color:'white'}} uppercase={false}>Back</Text>
            </Button>
          </Form>
    }
        </Content>
        </ScrollView>
        </Container>
      // </Image>
    );
  }
}
export default connect(mapStateToProps)(SignUp)
const styles = StyleSheet.create({
    container: {
     
      // width:300,
    // height:200,
   // position: 'relative',
   top: '-5%',
  //  paddingLeft: '10%',
  //  paddingRight: '10%',
    marginLeft:'7%',
    marginTop:'10%',
    marginRight:'7%',
    // marginBottom:'40%',
   padding: '10%',
    backgroundColor: '#ffffff',
    borderRadius:10,
    opacity: 0.9
  },
    headerLogo: {
    // height: 50,
    // width: 900,
    // flex: 1,
    width: '100%',
    height: 60,
    resizeMode: 'stretch',
    // opacity:1
  },
  submit: {
    borderRadius:10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor:'#E91E63'
  },
  back: {
    borderRadius:10,
    backgroundColor:'#E91E63'
    // marginTop:10,
    // marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
    // opacity:0.8
  }
});