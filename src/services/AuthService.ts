import { ComponentPublicInstance } from "vue";
import ConstantTool from "./tools/ConstantTool";
import JsonTool from "./tools/JsonTool";
import Session from "@/models/Session";

export default class LoginService {
    static async login(component: ComponentPublicInstance, email: string, password: string) {
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
}