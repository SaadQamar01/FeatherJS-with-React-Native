import { Alert, AsyncStorage } from 'react-native';
import ActionAuthentication from "./../actions/actionAuthentication.js";
import { Actions } from 'react-native-router-flux';
import Dashboard from './../../container/Dashboard.js';

// import client from './../../../feathers';

//Update in counter 13 -- create Middleware
export default class MiddlewareSignup {
    constructor() {
    }
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
