import User from "@/models/User";
import ConstantTool from "./tools/ConstantTool";
import { useAppStore } from "@/stores/app";
import JsonTool from "./tools/JsonTool";
import Response from "@/models/responses/Response";

export default class UserService {

    static async getUsers(component: ComponentPublicInstance): Promise<Response<User[]>> {
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + '/user', {
                headers: { Authorization: useAppStore().session.token, },
            })
            const users = JsonTool.jsonConvert.deserializeArray(response.data, User)
            return Promise.resolve({result: users})
        } catch(e) {
            return Promise.reject(e)
        }
    }

    static async getUser(component: ComponentPublicInstance, id: number): Promise<Response<User>> {
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + '/user' + id, {
                headers: { Authorization: useAppStore().session.token, },
            })
            const user = JsonTool.jsonConvert.deserializeObject(response.data, User)
            return Promise.resolve({result: user})
        } catch(e) {
            return Promise.reject(e)
        }
    }

    static async postUser(component: ComponentPublicInstance, payload: User): Promise<Response<User>> {
        try {
            const response = await component.axios.post(ConstantTool.BASE_URL + '/user', payload, {
                headers: { Authorization: useAppStore().session.token, },
            })
            const user = JsonTool.jsonConvert.deserializeObject(response.data, User)
            return Promise.resolve({ result: user })
        } catch(e) {
            return Promise.reject(e)
        }
    }

    static async deleteUser(component: ComponentPublicInstance, id: number) {
        try {
            const response = await component.axios.delete(ConstantTool.BASE_URL + '/user/' + id, {
                headers: { Authorization: useAppStore().session.token, },
            })
            const user = JsonTool.jsonConvert.deserializeObject(response.data, User)
            return Promise.resolve({ result: user })
        } catch(e) {
            return Promise.reject(e)
        }
    }

}