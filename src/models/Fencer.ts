import { JsonObject, JsonProperty } from "json2typescript"

@JsonObject("Fencer")
export default class Fencer {
    @JsonProperty("id", Number)
    id?: number = undefined

    @JsonProperty("name", String)
    name?: string = undefined

    @JsonProperty("email", String)
    email?: string = undefined
}