import { ComponentPublicInstance } from "vue";
import ConstantTool from "./tools/ConstantTool";
import JsonTool from "./tools/JsonTool";
import Session from "@/models/Session";
import Response from "@/models/responses/Response";
import axios from "axios";
import { useAppStore } from "@/stores/app";

export default class LoginService {
    static async login(component: ComponentPublicInstance, email: string, password: string) {
        component.axios.defaults.withCredentials = true
        try {
            const response = await component.axios.post(ConstantTool.BASE_URL + "/auth/login",{
                email, password
            })
            const loginResponse = JsonTool.jsonConvert.deserializeObject(response.data, Session)

            return Promise.resolve({result: loginResponse})
        } catch (e) {
            return Promise.reject(e)
        }
    }

    static async checkAuth(): Promise<Response<Session>> {
        try {
            const response = await axios.get(ConstantTool.BASE_URL + "/auth/check", {
                headers: {
                    Authorization: useAppStore().session.token,
                },
            })
            const session = JsonTool.jsonConvert.deserializeObject(response.data, Session)

            return Promise.resolve({result: session})
        } catch (e) {
            return Promise.reject(e)
        }
    }
}