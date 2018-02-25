import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import store from './../store/index.js';
import MiddlewareAuthentication from './../store/middleWares/middlewareAuthentication.js';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import SignUp from './SignUp.js'
import Dashboard from './Dashboard.js';
import { Container, Header, Content, Form, Item, Input, Label, Button, Spinner, Icon } from 'native-base';
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
import client from './../../feathers';
function mapStateToProps(state) {
  return {
    isLogin: state.reducerLogin,
  };
}

const { width, height } = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      mode: (Dimensions.get('window').width < Dimensions.get('window').height) ? 'verticle' : 'horizontal'
    }
  }
  // componentWillMount() {
  //   Dimensions.addEventListener('change', () =>
  //     this.setState({ mode: (Dimensions.get('window').width < Dimensions.get('window').height) ? 'verticle' : 'horizontal' }));
  //   BackHandler.addEventListener('backPress', this.handleBackButton);
  // }
  // componentWillUnmount() {
  //   Dimensions.removeEventListener('change', () =>
  //     this.setState({ mode: (Dimensions.get('window').width < Dimensions.get('window').height) ? 'verticle' : 'horizontal' }));

  //   BackHandler.removeEventListener('backPress', false);
  // }
  // handleBackButton() {
  //   try {
  //     // alert(Actions.currentRouter.currentRoute);
  //     Actions.home();
  //     return true;
  //   } catch (err) {
  //     return false;
  //   }
  // }
  // changeDimensions() {
  //   this.setState({ istrue: false })
  // }
  componentWillMount() {
    client.authenticate().catch((err) => console.log(err));
    client.on('authenticated', login => {
      console.log(login);
      Actions.Dashboard();
    });
    // store.dispatch(MiddlewareAuthentication.loadComponent());
  }
  // login() {
    // var email = this.state.Email;
    // var password = this.state.Passdword;
    // if (email == '' || password == '') {
    //   Alert.alert("Please Fill Email & Password")
    // }
    // else {
    //   client.authenticate({
    //     strategy: 'local',
    //     email, password
    //   }).catch(error => this.setState({ error }));
    //   // Details = {
    //   //   Email: userEmail,
    //   //   Password: userPassword,
    //   // }
    //   // store.dispatch(MiddlewareAuthentication.asyncLogin(Details));
    // }
  // }
  login() {
    const { email, password } = this.state;
    console.log(email,password)
     client.authenticate({
      strategy: 'local', 
      email, 
      password
    }).then(response => {
      console.log(response)
      this.setState({email:'',password:''})
      return client.passport.verifyJWT(response.accessToken)
    })
    .then(payload => {
      console.log(payload) 
      return client.service('users').get(payload.userId)
        .then(user => {Actions.Dashboard(); console.log("authentication success"); console.log(user) })
    })
      .catch(error => console.log(error));
  }
  render() {
    return (
      // <ImageBackgroud source={require('../Images/bg2.jpg')}
      //   style={styles.backgroundImage}>
      <Container style={{ backgroundColor: '#222222cf' }}>
        <ScrollView>
          {this.state.mode == 'verticle' ? <Image style={{ borderRadius: 70, height: 80, width: 80, top: '12%', left: '40%', zIndex: 10 }}
            source={require('../Images/logo.png')} />
            : <Image style={{ borderRadius: 70, height: 110, width: 110, top: '14%', left: '40%', zIndex: 10 }}
              source={require('../Images/logo.png')} />
          }
          <Content style={styles.container}>
            <Form>
              <Item floatingLabel>
                <Label style={{ marginLeft: 10 }}>Email:</Label>
                <Input onChangeText={(email) => this.setState({ email })} />
              </Item>
              <Item floatingLabel>
                <Label style={{ marginLeft: 10 }}>Password:</Label>
                <Input secureTextEntry={true} password={true} onChangeText={(password) => this.setState({ password })} />
              </Item>
              <Button active full onPress={this.login.bind(this)} style={styles.login}>
                <Text style={{ fontWeight: 'normal', color: 'white' }}>Login</Text>
              </Button>
              <Button active full onPress={() => Actions.SignUp()} style={styles.signup}>
                <Text style={{ fontWeight: 'normal', color: 'white' }}>Signup</Text>
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
    marginLeft: '7%',
    marginTop: '10%',
    marginRight: '7%',
    // marginBottom:'40%',
    padding: '10%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
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
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#E91E63'
  },
  signup: {
    borderRadius: 10,
    // marginTop:10,
    marginBottom: 20,
    backgroundColor: '#E91E63'
  },
  backgroundImage: {
    position: 'absolute',
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
    // opacity:0.8
  }
});