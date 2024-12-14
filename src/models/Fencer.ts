import { JsonObject, JsonProperty } from "json2typescript"
import Auditing from "./Auditing"

@JsonObject("Fencer")
export default class Fencer extends Auditing {
    @JsonProperty("id", Number)
    id?: number = undefined

    @JsonProperty("name", String, true)
    name?: string = undefined

    @JsonProperty("email", String, true)
    email?: string = undefined
}