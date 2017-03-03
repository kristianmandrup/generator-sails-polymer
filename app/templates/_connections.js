module.exports.connections = {
  <% if (disk) { %>
  localDiskDb: {
    adapter: 'sails-disk'
  },
  <% } %>
  <% if (redis) { %>
  cache: {
    adapter: 'sails-redis',
    url: 'redis://localhost:6379',

    // Other available low-level options can also be configured here.
    // (see below for more information)
  },
  <% } %>
  <% if (mongo) { %>
  mongo: {
    adapter: 'sails-mongo',
    url: 'mongodb://localhost:27017/<%= dbName %>'
  }
  <% } %>
  <% if (postgres) { %>
  postgres: {
    adapter: 'sails-postgresql',
    host: 'localhost',
    user: 'postgres',
    password: '<postgresql password>',
    database: '<%= dbName %>'
  },
  <% } %>
  <% if (mysql) { %>
  mysql: {
    adapter: 'sails-mysql',
    host: 'localhost',
    user: 'mysql',
    password: '<mysql password>',
    database: '<%= dbName %>'
  }
  <% } %>
};
