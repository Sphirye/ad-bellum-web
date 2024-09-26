import { JsonProperty } from "json2typescript"

export default class User {
    @JsonProperty("id", Number)
    id?: number = undefined

    @JsonProperty("email", String)
    email?: string = undefined
}