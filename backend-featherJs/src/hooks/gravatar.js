// // Use this hook to manipulate incoming or outgoing data.
// // For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
//   return function gravatar (hook) {
//     // Hooks can either return nothing or a promise
//     // that resolves with the `hook` object for asynchronous operations
//     return Promise.resolve(hook);
//   };
// };
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// We need this to create the MD5 hash
const crypto = require('crypto');
// The Gravatar image service
const gravatarUrl = 'https://s.gravatar.com/avatar';
// The size query. Our chat needs 60px images
const query = 's=60';
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return  context => {
    // The user email
    const { email } = context.data;
    // Gravatar uses MD5 hashes from an email address to get the image
    const hash = crypto.createHash('md5').update(email).digest('hex');
    context.data.avatar = `${gravatarUrl}/${hash}?${query}`;
    // Best practise, hooks should always return the context
    return context;
  };
};
