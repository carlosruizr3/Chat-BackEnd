import { MessagesModel } from "../models/messages.model.js"
import { UserModel } from "../models/user.model.js";
import { ChatModel } from "../models/chat.model.js";
import { Op } from "sequelize";

class messagesQueries {

    async create(data) {
        try {
            const query = await MessagesModel.create(data);
            if (query) {
                return { ok: true, data: query }
            } else {
                return { ok: false, data: null }
            }
        } catch (e) {
            console.log("error al ejecutar query", e)
        }
    }

    async delete(condition = {}) {
        try {
            const query = await MessagesModel.destroy({ where: condition });
            if (query) {
                return { ok: true, data: query }
            } else {
                return { ok: false, data: null }
            }
        } catch (e) {
            console.log("error en queryy", e)
        }
    }

    async update(data, condition = {}) {
        try {
            const query = await MessagesModel.update(data, { where: condition })
            if (query) {
                return { ok: true, data: query }
            } else {
                return { ok: false, data: null }
            }
        } catch (e) {
            console.log("erorre end qmueeu", e)
        }
    }

    async find() {
        try {
            const query = await MessagesModel.findAll();
            console.log(" queerry   ejecutada user  findall ", query);
            if (query) {
                return { ok: true, data: query };
            }
        } catch (e) {
            console.log("error  al  e jercutar query ", e)
            return { ok: false, data: null }
        }
    }


    async findAll(chat_id) {
        try {
            const query = await MessagesModel.findAll({
                where: {
                    [Op.or]: [
                        {
                            id_conversacion: chat_id
                        }
                    ]
                }
            });
            if (query) {
                return { ok: true, data: query }
            } else {
                return { ok: false }
            }
        } catch (error) {
            console.log('error al-d ejeccutar query  ', error);
            return { ok: false, data: null };
        }
    }
}

export const MessagesQueries = new messagesQueries();