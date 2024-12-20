import axios from "axios"
import ConstantTool from "./tools/ConstantTool"
import { useAppStore } from "@/stores/app"
import JsonTool from "./tools/JsonTool"
import ScoreProfile from "@/models/ScoreProfile"
import Response from "@/models/responses/Response"

export default class ScoreProfileService {

    static async getScoreProfile(id: number): Promise<Response<ScoreProfile>> {
        try {
            const response = await axios.get(ConstantTool.BASE_URL + "/score-profile/" + id, {
                headers: {
                    Authorization: useAppStore().session.token,
                }
            })
            const scoreProfile = JsonTool.jsonConvert.deserializeObject(response.data, ScoreProfile)
            return Promise.resolve({ result: scoreProfile })
        } catch(e) {
            return Promise.reject(e)
        }
    }

    static async getScoreProfiles(example?: ScoreProfile): Promise<Response<ScoreProfile[]>> {
        try {
            const response = await axios.get(ConstantTool.BASE_URL + "/score-profile", {
                headers: {
                    Authorization: useAppStore().session.token,
                }
            })
            const scoreProfiles = JsonTool.jsonConvert.deserializeArray(response.data, ScoreProfile)
            return Promise.resolve({ result: scoreProfiles })
        } catch(e) {
            return Promise.reject(e)
        }
    }

    static async postScoreProfile(payload: ScoreProfile): Promise<Response<ScoreProfile>> {
        try {
            const response = await axios.post(ConstantTool.BASE_URL + "/score-profile", payload, {
                headers: {
                    Authorization: useAppStore().session.token,
                }
            })
            const scoreProfile = JsonTool.jsonConvert.deserializeObject(response.data, ScoreProfile)
            return Promise.resolve({ result: scoreProfile })
        } catch(e) {
            return Promise.reject(e)
        }
    }
}