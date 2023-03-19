import {Sequelize} from 'sequelize';
 import dotenv from 'dotenv';

dotenv.config  ();

export const  DatabaseConfig  = new   Sequelize({
    host: process.env.DB_HOST ,
    database:  process.env.DB_NAME ,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD    ,
    dialect: 'mysql' ,
    timezone: '-05:00' ,
    port: +process.env.DB_PORT ,
    logging: false,
}  ) ;

 export class Database  {
     async connection () {
         try {
             await DatabaseConfig.authenticate();
             return  {ok: true, message  : 'connection  to the datxcabase established correctly'}
         } catch (e) {
             return {ok: false, message: 'could not connect to the database'}
         }
     }
  }
