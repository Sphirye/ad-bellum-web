import DateTimeConverter from "@/services/converters/DateTimeConverter";
import { JsonObject, JsonProperty } from "json2typescript";
import { DateTime } from "luxon";
import User from "./User";

@JsonObject("Auditing")
export default class Auditing {

    @JsonProperty("createdAt", DateTimeConverter, true)
    private _createdAt?: DateTime = undefined

    @JsonProperty("createdBy", User, true)
    private _createdBy?: User = undefined

    get createdBy(): User | undefined {
        return this._createdBy;
    }
    set createdBy(value: User | undefined) {
        this._createdBy = value;
    }
    get createdAt(): DateTime | undefined {
        return this._createdAt;
    }
    set createdAt(value: DateTime | undefined ) {
        this._createdAt = value;
    }

}