module.exports.connections = {

  localDiskDb: {
    adapter: 'sails-disk'
  },

  mongo: {
    adapter: 'sails-mongo',
    url: 'mongodb://your-mongo-db'
  }

};
