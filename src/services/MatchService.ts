import Match from "@/models/Match";
import ConstantTool from "./tools/ConstantTool";
import { useAppStore } from "@/stores/app";
import JsonTool from "./tools/JsonTool";
import Response from "@/models/responses/Response";

export default class MatchService {

    static async getMatch(component: ComponentPublicInstance, id: number) {
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + '/match/' + id, {
                headers: {
                    Authorization: useAppStore().session.token,
                }
            })
            const match = JsonTool.jsonConvert.deserializeObject(response.data, Match)
            return Promise.resolve({ result: match })
        } catch(e) {
            return Promise.reject(e)
        }
    }

    static async getMatches(component: ComponentPublicInstance, match?: Match): Promise<Response<Match[]>> {
        try {
            const response = await component.axios.get(ConstantTool.BASE_URL + '/match', {
                params: match,
                headers: { Authorization: useAppStore().session.token, },
                }
            )
            const matches = JsonTool.jsonConvert.deserializeArray(response.data, Match)
            return Promise.resolve({ result: matches })
        } catch(e) {
            return Promise.reject(e)
        }
    }

    static async postMatch(component: ComponentPublicInstance, payload: Match): Promise<Response<Match>> {
        try {
            const response = await component.axios.post(ConstantTool.BASE_URL + '/match', payload,{
                headers: {
                    Authorization: useAppStore().session.token,
                }
            }
        )
        const match = JsonTool.jsonConvert.deserializeObject(response.data, Match)
        return Promise.resolve({ result: match })
        } catch(e) {
            return Promise.reject(e)
        }
    }

    static async updateMatch(component: ComponentPublicInstance, payload: Match, id: number) {
        try {
            const response = await component.axios.put(ConstantTool.BASE_URL + '/match/' + id, payload, {
                headers: {
                    Authorization: useAppStore().session.token,
                }
            })
            const match = JsonTool.jsonConvert.deserializeObject(response.data, Match)
            return Promise.resolve({ result: match })
        } catch (e) {
            return Promise.reject(e)
        }
    }

}