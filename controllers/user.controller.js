import { request, response } from "express";
import { UserQueries } from "../queries/user.queries.js"
import { Payload } from "../helpers/payload.js";
import { encrypt } from "../helpers/handleBcrpt.js"
import App from "../config/config.js"

class UserController {

    static payload = new Payload();

    async sayHello(request, response) {
        console.log("ok ")
        return response.status(200).json({
            ok: true,
            message: 'hola desde back '

        })
    }

    async processData(request, response) {
        const body = request.body;
        console.log('datr  flrom front', body);
        return response.status(403).json({ ok: true, message: '  data received  ' });
    }

    async create(request, response) {
        const body = request.body;
        console.log(body)
        const pass = await encrypt.encrypt(body.pass)
        const query = await UserQueries.create(body.user_id, body.nombre, body.apellido_p, body.apellido_m, pass, body.correo, body.foto);
        if (query.ok) {
            return response.status(200).json({ ok: true, data: query.data });
        } else {
            return response.status(403).json({ ok: false, message: 'error en  .jk{rccess' });
        }
    }

    
    async findAll(request, response) {
        const query = await UserQueries.find();
        if (query) {
            return response.status(200).json({ ok: true, data: query.data })
        }
        else {
            return response.status(403).json({ ok: false, data: null })
        }
    }
    /*
    async findAll(request, response) {
        const body = request.body;
        console.log(" body : ", body)
        const condition = body.condition;
        const query = await UserQueries.find();
        console.log(query)
        if (query) {
            return response.status(200).json({ ok: true, data: query.data })
        }
        else {
            return response.status(403).json({ ok: false, data: null })
        }
    }*/



    async login(request, response) {
        const body = request.body;
        console.log("body :", body)
        const query = await UserQueries.findOne({
            correo: body.correo,
            pass: body.pass,
        })

        if (query) {

            const pass = await encrypt.comparePass(body.pass, query.data.pass)

            if (pass) {
                try {
                    const token = UserController.payload.createToken(query.data);
                    return response.status(200).send({
                        ok: true, data: query.data, token: token
                    })
                } catch (e) {
                    console.log("errord d", e)
                    return response.status(403).send({
                        ok: false,
                        data: null
                    });
                }
            } else {
                console.log("contraseña invalida  ")
                return response.status(403).send({
                    ok: false,
                    data: null,
                })
            }
        } else {
            console.log("usuario invalido  ")
        }

    }

    async findOneUser(request, response) {
        const user_id = request.params.id;
        const query = await UserQueries.findOne_user({
            user_id: user_id
        })

        if (query) {
            return response.status(200).json({ ok: true, data: query.data })
        } else {
            return response.status(403).json({ ok: false, data: null })
        }
    }



    async updateUser(request, response) {
        const body = request.body
        const user_id = request.params.id;
        const query = await UserQueries.update(body, {
            user_id: user_id
        })


        if (query) {
            return response.status(200).json({ ok: true, data: query.data })
        } else {
            return response.status(403).json({ ok: false, data: null })
        }
    }



    async registro(request, response) {
        const body = request.body;
        const password = await encrypt.encrypt(body.password)
        const query = await UserQueries.createUser(body.id, body.nombre, body.apellido, body.email, body.username, password, body.foto, body.profesion, body.descripcion)
        if (query) {
            return response.status(200).json({ ok: true, data: query })
        }
        else {
            return response.status(403).json({ ok: false, data: null })
        }
    }
}

export const userController = new UserController();