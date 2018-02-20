// // Use this hook to manipulate incoming or outgoing data.
// // For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
//   return function populateUser (hook) {
//     // Hooks can either return nothing or a promise
//     // that resolves with the `hook` object for asynchronous operations
//     return Promise.resolve(hook);
//   };
// };
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return context => {
    // Get `app`, `method`, `params` and `result` from the hook context
    const { app, method, result, params } = context;
    // Make sure that we always have a list of messages either by wrapping
    // a single message into an array or by getting the `data` from the `find` method result
    const messages = method === 'find' ? result.data : [result];
    // Asynchronously get user object from each messages `userId`
    // and add it to the message
    Promise.all(messages.map(message => {
      // We'll also pass the original `params` to the service call
      // so that it has the same information available (e.g. who is requesting it)
      const user = app.service('users').get(message.userId, params);
      message.user = user;
    }));
    // Best practise,
  };
};
