import { JsonObject, JsonProperty } from "json2typescript"

@JsonObject("Fencer")
export default class Fencer {
    @JsonProperty("id", Number)
    id?: number = undefined

    @JsonProperty("name", String, true)
    name?: string = undefined

    @JsonProperty("email", String, true)
    email?: string = undefined
}