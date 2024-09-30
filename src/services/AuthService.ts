import { ComponentPublicInstance } from "vue";
import ConstantTool from "./tools/ConstantTool";
import JsonTool from "./tools/JsonTool";
import LoginResponse from "@/models/responses/LoginResponse";

export default class LoginService {
    static async login(component: ComponentPublicInstance) {
        try {
            const response = await component.axios.post(ConstantTool.BASE_URL + "/auth/login", {
                email: "sphirye@gmail.com",
                password: "1234",
            })
            const loginResponse = JsonTool.jsonConvert.deserializeObject(response.data, LoginResponse)

            return loginResponse
        } catch (e) {
            console.log("Algo ha salido mal al iniciar sesión")
        }
    }
}