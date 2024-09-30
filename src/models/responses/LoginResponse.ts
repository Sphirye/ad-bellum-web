import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("LoginResponse")
export default class LoginResponse {

    @JsonProperty("token", String, true)
    token?: string = undefined

}