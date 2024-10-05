import Fencer from "@/models/Fencer"
import ConstantTool from "./tools/ConstantTool"
import JsonTool from "./tools/JsonTool"
import Response from "@/models/responses/Response"
import { useAppStore } from "@/stores/app"
import { ComponentPublicInstance } from "vue"

export default class FencerService {
    static async getFencers(component: ComponentPublicInstance): Promise<Response<Fencer[]>> {
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + '/fencer', {
                headers: {
                    Authorization: useAppStore().session.token
                }
            })
            const fencers = JsonTool.jsonConvert.deserializeArray(response.data, Fencer)
            return Promise.resolve({ result: fencers })
        } catch(e) {
            return Promise.reject(e)
        }
    }

    static async postFencer(component: ComponentPublicInstance, payload: Fencer) {
        try {
            const response = await component.axios.post(ConstantTool.BASE_URL + '/fencer', payload, {
                headers: {
                    Authorization: useAppStore().session.token
                },
            })
            const fencer = JsonTool.jsonConvert.deserializeObject(response.data, Fencer)
            return Promise.resolve({ result: fencer })
        } catch(e) {
            return Promise.reject(e)
        }
    }
}