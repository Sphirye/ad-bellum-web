import { useAppStore } from "@/stores/app"
import ConstantTool from "./tools/ConstantTool"
import MatchScore from "@/models/MatchScore"
import JsonTool from "./tools/JsonTool"
import Response from "@/models/responses/Response"
import axios from "axios"

export default class MatchScoreService {

    static async getScores(component: ComponentPublicInstance, example: MatchScore): Promise<Response<MatchScore[]>> {
        try {
            const response = await component.axios.get(
                ConstantTool.BASE_URL + '/match-score', 
                {
                    headers: { Authorization: useAppStore().session.token },
                    params: example,
                }
            )
            const scores = JsonTool.jsonConvert.deserializeArray(response.data, MatchScore)
            return Promise.resolve({ result: scores })
        } catch(e) {
            return Promise.reject(e)
        }
    }

    static async postScore(payload: MatchScore) {
        try {
            const response = await axios.post(ConstantTool.BASE_URL + '/match-score', payload, {
                    headers: { Authorization: useAppStore().session.token }
                }
            )
            const score = JsonTool.jsonConvert.deserializeObject(response.data, MatchScore)
            return Promise.resolve({ result: score })
        } catch(e) {
            return Promise.reject(e)
        }
    }

    static async updateScore(component: ComponentPublicInstance, payload: MatchScore, id: number) {
        try {
            const response = await component.axios.put(ConstantTool.BASE_URL + '/match-score/' + id, payload, {
                    headers: { Authorization: useAppStore().session.token }
                }
            )
            const score = JsonTool.jsonConvert.deserializeObject(response.data, MatchScore)
            return Promise.resolve({ result: score })
        } catch(e) {
            return Promise.reject(e)
        }
    }

    static async delete(id: number): Promise<any> {
        try {
            await axios.delete(ConstantTool.BASE_URL + '/match-score/' + id, {
                    headers: { Authorization: useAppStore().session.token }
                }
            )
            return Promise.resolve()
        } catch(e) {
            return Promise.reject(e)
        }
    }

}