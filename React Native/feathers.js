import {AsyncStorage} from 'react-native'
import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';

const options={transports:['websocket'],timeout: 20000};
const socket = io('https://support.driventechnical.com',options);
const client = feathers();

client.configure(socketio(socket));
client.configure(authentication({
  storage: AsyncStorage
}));

export default client;

// import io from 'socket.io-client';
// import feathers from '@feathersjs/feathers';
// import socketio from '@feathersjs/socketio-client';
// import authentication from '@feathersjs/authentication-client';

// const socket = io('http://api.my-feathers-server.com', {
//   transports: ['websocket'],pingTimeout:3000,pingInterval:5000,
//   forceNew: true
// });
// const client = feathers();

// client.configure(socketio(socket));
// client.configure(authentication({
//   storage: AsyncStorage
// }));

// export default client;
// import {Alert, AsyncStorage} from 'react-native';
// import io from 'socket.io-client';
// import feathers from 'feathers/client'
// import hooks from 'feathers-hooks';
// import socketio from 'feathers-socketio/client'
// import authentication from 'feathers-authentication-client';
// const API = 'http://localhost:3030';

// const options = {transports: ['websocket'], timeout: 20000 };
// const socket = io(API, options);
// var client = feathers()
// .configure(socketio(socket))
// .configure(hooks())
// .configure(authentication({
//   storage: AsyncStorage // To store our accessToken
// }));

// client.io.on('connect', () => {
//   console.log("connect")
//   this.authenticate().then(() => {
//     console.log('authenticated after reconnection');
//   }).catch(error => {
//     console.log('error authenticating after reconnection', error);
//   });
// });

// client.io.on('disconnect', () => {
//   console.log('disconnected');
// });

// export default client;
