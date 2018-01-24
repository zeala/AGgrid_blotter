function buildConfig(env) {
  return require('./config/webpack.config.' + env)
}

module.exports = buildConfig;
