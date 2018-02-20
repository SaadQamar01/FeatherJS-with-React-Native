import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import store from './../store/index.js';
import MiddlewareAuthentication from './../store/middleWares/middlewareAuthentication.js';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import SignUp from './SignUp.js'
import Dashboard from './Dashboard.js';
import { Container, Header, Content, Form, Item, Input, Label, Button,Spinner,Icon } from 'native-base';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackgroud,
  Alert,
  Dimensions
} from 'react-native';
function mapStateToProps(state) {
  return {
    isLogin: state.reducerLogin,
  };
}

const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
class Login extends Component {
  constructor() {
    super();
    this.state = {
      Email: '',
      Password: '',
      mode:(Dimensions.get('window').width<Dimensions.get('window').height)?'verticle':'horizontal'
    }
  }
  componentWillMount(){
    Dimensions.addEventListener('change',()=> 
    this.setState({mode:(Dimensions.get('window').width<Dimensions.get('window').height)?'verticle':'horizontal'}));

    BackHandler.addEventListener('backPress', this.handleBackButton);

  }
      componentWillUnmount() {
        Dimensions.removeEventListener('change',()=> 
    this.setState({mode:(Dimensions.get('window').width<Dimensions.get('window').height)?'verticle':'horizontal'}));

    BackHandler.removeEventListener('backPress', false);
    }
        handleBackButton() {
    try {
    // alert(Actions.currentRouter.currentRoute);
      Actions.home();
      return true;
    } catch (err) {
    return false;
        }
     }
    changeDimensions() {
        this.setState({istrue:false})
     }
  // componentDidMount() {
  //   store.dispatch(MiddlewareAuthentication.loadComponent());
  // }
  login() {
    var userEmail = this.state.Email;
    var userPassword = this.state.Password;
        if(userEmail==''||userPassword==''){
      Alert.alert("Please Fill Email & Password")
    }
    else{
    Details={
     Email : userEmail,
     Password : userPassword,
    }
    store.dispatch(MiddlewareAuthentication.asyncLogin(Details));
    }
  }

  render() {
    return (
      // <ImageBackgroud source={require('../Images/bg2.jpg')}
      //   style={styles.backgroundImage}>
        <Container style={{backgroundColor:'#222222cf'}}>
        <ScrollView>
           {this.state.mode=='verticle'?     <Image  style={{borderRadius:70,height:110,width:110,top:'12%',left:'33%',zIndex:10}} 
                source={require('../Images/logo.png')} />
           :     <Image  style={{borderRadius:70,height:110,width:110,top:'14%',left:'40%',zIndex:10}} 
                source={require('../Images/logo.png')} />
           }
        <Content style={styles.container}>
          <Form>
            <Item floatingLabel>
              <Label style={{marginLeft:10}}>Email:</Label>
              <Input onChangeText={(Email) => this.setState({ Email })} />
            </Item>
            <Item floatingLabel>
              <Label style={{marginLeft:10}}>Password:</Label>
             <Input secureTextEntry={true} password={true} onChangeText={(Password) => this.setState({ Password })} />
            </Item>
            <Button active  full onPress={this.login.bind(this)} style={styles.login}>
              <Text style={{fontWeight: 'normal',color:'white'}}>Login</Text>
            </Button>
            <Button active full onPress={() => Actions.SignUp()} style={styles.signup}>
              <Text style={{fontWeight: 'normal',color:'white'}}>Signup</Text>
            </Button>
          </Form>
        </Content>
        </ScrollView>
        </Container>
      // </ImageBackgroud>
    );
  }
}

export default connect(mapStateToProps)(Login)
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
  login: {
    borderRadius:10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor:'#E91E63'
  },
  signup: {
    borderRadius:10,
    // marginTop:10,
    marginBottom: 20,
    backgroundColor:'#E91E63'
  },
  backgroundImage: {
    position:'absolute',
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
    // opacity:0.8
  }
});