import { JsonObject, JsonProperty } from "json2typescript"
import Authority from "./Authority"

@JsonObject("User")
export default class User {
    @JsonProperty("id", Number)
    id?: number = undefined

    @JsonProperty("email", String)
    email?: string = undefined

    @JsonProperty("authorities", [Authority], true)
    authorities?: Authority[] = undefined
}