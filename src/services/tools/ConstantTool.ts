import { config } from "dotenv"
config()

export default class ConstantTool {

    static readonly BASE_URL = process.env.VUE_APP_BASE_URL
    
    static readonly DEVELOPMENT_DIALOG = process.env.VUE_APP_DEVELOPMENT_DIALOG

}