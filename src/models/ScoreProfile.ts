import { JsonObject, JsonProperty } from "json2typescript";
import Auditing from "./Auditing";

@JsonObject("ScoreProfile")
export default class ScoreProfile extends Auditing {

    @JsonProperty("id", Number, true)
    id?: number = undefined

    @JsonProperty("name", String, true)
    name?: string = undefined

    @JsonProperty("cuts", Number, true)
    cuts?: number = undefined

    @JsonProperty("slices", Number, true)
    slices?: number = undefined

    @JsonProperty("thrusts", Number, true)
    thrusts?: number = undefined

    @JsonProperty("controls", Number, true)
    controls?: number = undefined

    @JsonProperty("timeLimitInSeconds", Number, true)
    timeLimitInSeconds?: number = undefined
}