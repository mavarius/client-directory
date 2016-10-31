const config = {
  db: {
    'production': process.env.MONGO_URI,
    'development': 'mongodb://localhost/client-directory',
    'test': 'mongodb://localhost/client-directory-test'
  }
}

module.exports = config
