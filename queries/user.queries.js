 import {UserModel  } from "../models/user.model.js"
 import {raw, response} from "express";
  import {encrypt} from "../helpers/handleBcrpt.js";


 class userQueries  {
     async store (   user ){


         try    {
             const query  = await UserModel.create(user) ;
             if (query) {
                 return {ok: true, data: query };
              }
         }  catch  (e) {
                 console.log(' error   al  ejecutar query ',e );
                return {ok: false, data: null   }
         }
      }


         async  find   ( ) {
             try  {

              const query  =     await UserModel.findAll () ;

               if (query )    {
                 return {ok: true,    data: query } ;
             }
          }  catch  (e )  {
             console.log("error  al  e jercutar queryc ", e)
             return {ok: false, data :  null }
         }

       }

      async     findOne (  condition    =  {} ) {
         try {
              const query =   await UserModel.findOne  ({where:  {correo:  condition.correo } }) ;

             if (query)  {
                 return  {ok: true,  data: query};
              }
         }  catch  (e) {
             return {ok: false, data :  null }
         }
      }

     async     findOne_user (  condition    =  {} ) {
         try {
             const query =   await UserModel.findOne  (  {where:  {user_id:  condition.user_id    } }) ;

             if (query)  {
                 return  {ok: true,  data: query};
             }
         }  catch  (e) {
             return {ok: false, data :  null }
         }
     }

      async update (data, condition = {})  {
         try {
             const query = await UserModel. update( data, {where: condition})
             if (query)   {
                 return {ok: true, data: query}
             }  else {
                 return {ok: false, data: null }
             }
         }catch (e) {
             console.log("erorre end queeu", e)
         }
     }




       async   create   ( user_id ,    nombre,   apellido_p,   apellido_m ,  pass, correo,  foto )  {


         try  {
             const  query   = await   UserModel.create ({
                 user_id  : user_id ,
                  nombre : nombre ,
                  apellido_p : apellido_p ,
                     apellido_m :apellido_m ,
                    pass: pass,
                   correo: correo,
                      foto: foto
              });
             if (query) {
                 return {ok: true, data: query}
             } else  {
                 return {ok: false, data: null }
             }


          } catch (e) {
              return {ok: false, data: null}
         }
     }
 }


 export const UserQueries = new  userQueries();