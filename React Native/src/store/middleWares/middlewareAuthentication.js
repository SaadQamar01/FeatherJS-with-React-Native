import { Alert, AsyncStorage } from 'react-native';
import ActionAuthentication from "./../actions/actionAuthentication.js";
import { Actions } from 'react-native-router-flux';
import Dashboard from './../../container/Dashboard.js';
import io from 'socket.io-client';
import feathers from 'feathers/client'
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication-client';
const PLACEHOLDER = 'https://raw.githubusercontent.com/feathersjs/feathers-chat/master/public/placeholder.png';
const API_URL = 'http://localhost:3030';


//Update in counter 13 -- create Middleware
export default class MiddlewareSignup {
    constructor() {
        const options = { transports: ['websocket'], pingTimeout: 3000, pingInterval: 5000 };
        const socket = io(API_URL, options);

        this.app = feathers()
            .configure(socketio(socket))
            .configure(hooks())
            .configure(authentication({
                storage: AsyncStorage // To store our accessToken
            }));
    }
    // connect() {
    //     this.isConnecting = true;

    //     this.app.io.on('connect', () => {
    //         this.isConnecting = false;

    //         this.authenticate().then(() => {
    //             console.log('authenticated after reconnection');
    //         }).catch(error => {
    //             console.log('error authenticating after reconnection', error);
    //         });
    //     });

    //     this.app.io.on('disconnect', () => {
    //         console.log('disconnected');
    //         this.isConnecting = true;
    //     });
    // }
    static asyncSignup(detail) {
        var email = detail.Email
        var password = detail.Password
        const credentials = { email, password };
        return this.app.service('users').create(userData).then((result) => {
          return this.authenticate(Object.assign(userData, {strategy: 'local'}))
        });
      }
    
      login(email, password) {
        const payload = {
          strategy: 'local',
          email,
          password
        };
        return this.authenticate(payload);
      }
    
      authenticate(options) {
        options = options ? options : undefined;
        return this._authenticate(options).then(user => {
          console.log('authenticated successfully', user._id, user.email);
          this.user = user;
          this.isAuthenticated = true;
          return Promise.resolve(user);
        }).catch(error => {
          console.log('authenticated failed', error.message);
          console.log(error);
          return Promise.reject(error);
        });
      }
    
      _authenticate(payload) {
        return this.app.authenticate(payload)
          .then(response => {
            return this.app.passport.verifyJWT(response.accessToken);
          })
          .then(payload => {
            return this.app.service('users').get(payload.userId);
          }).catch(e => Promise.reject(e));
      }
    // static asyncSignup(detail) {
        // var email = detail.Email
        // var password = detail.Password
        // const credentials = { email, password };
        // client.service('users').create(credentials).then(data => console.log(data)).catch(err => console.log(err))
        // const payload = Object.assign({ strategy: 'local' }, credentials);
        // client.authenticate(payload).then(data => console.log(data)).catch(err => console.log(err))
        // return (dispatch) => {
        //     return this.app.service('users').create(userData).then((result) => {
        //         return this.authenticate(Object.assign(userData, { strategy: 'local' }))
        //     });
        // }
    // }

    // static asyncLogin(detail) {
        // const payload = {
        //     strategy: 'local',
        //     email: detail.Email,
        //     password: detail.Password
        // };
        //  client.authenticate(payload).then(data => console.log(data)).catch(err => console.log(err))
    // }

    // static asyncLogout() {
        // this.app.logout();
        // this.isAuthenticated = false;
    // }

    // authenticate(options) {
    //     options = options ? options : undefined;
    //     return this._authenticate(options).then(user => {
    //         console.log('authenticated successfully', user._id, user.email);
    //         this.user = user;
    //         this.isAuthenticated = true;
    //         return Promise.resolve(user);
    //     }).catch(error => {
    //         console.log('authenticated failed', error.message);
    //         console.log(error);
    //         return Promise.reject(error);
    //     });
    // }

    // _authenticate(payload) {
    //     return this.app.authenticate(payload)
    //         .then(response => {
    //             return this.app.passport.verifyJWT(response.accessToken);
    //         })
    //         .then(payload => {
    //             return this.app.service('users').get(payload.userId);
    //         }).catch(e => Promise.reject(e));
    // }
}
