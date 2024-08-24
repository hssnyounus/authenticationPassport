require('dotenv').config();
module.exports = {
  development:{
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST, 
    dialect: 'mysql'
  },


  test:{
    database:process.env.DB_USERNAME,
    username:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    host:process.env.HOST,
    dialect:'mysql'
  
  },
  production:{
    username:process.env.DB_USERNAME,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    host:process.env.HOST,
    dialect:'mysql'
  
  },


}