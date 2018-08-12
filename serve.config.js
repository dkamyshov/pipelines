var fallback = require('koa-history-api-fallback');

module.exports = {
  add: (app, middleware, options) => {
    app.use(fallback());
  },
};
