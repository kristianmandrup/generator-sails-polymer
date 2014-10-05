module.exports.sockets = {

  onConnect: function() {
    sails.log.debug('Joined socket!');
  },

  onDisconnect: function() {
    sails.log.debug('Leaving socket!');
  }

};
