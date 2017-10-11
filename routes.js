const routes = require('next-routes')();

routes.add('index');
routes.add('details', '/details/:postId');

module.exports = routes;
