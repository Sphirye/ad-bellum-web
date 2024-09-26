import { JsonObject, JsonProperty } from "json2typescript"

@JsonObject("User")
export default class User {
    @JsonProperty("id", Number)
    id?: number = undefined

    @JsonProperty("email", String)
    email?: string = undefined
}