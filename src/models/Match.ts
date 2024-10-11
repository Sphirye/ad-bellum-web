import { JsonConverter, JsonCustomConvert, JsonObject, JsonProperty } from "json2typescript"
import MatchScore from "./MatchScore"
import Fencer from "./Fencer"

export enum MatchState {
    WAITING = "WAITING",
    IN_PROGRESS = "SEND",
    FINISHED = "FINISHED",
}

@JsonConverter
class MatchStateConverter implements JsonCustomConvert<MatchState> {
    deserialize(data: string): MatchState {
        return (<any>MatchState)[data]
    }
    serialize(data: MatchState): any {
        return data.toString()
    }
}

@JsonObject("Match")
export default class Match {
    @JsonProperty("id", Number)
    id?: number = undefined

    totalTime?: string = undefined

    @JsonProperty("fencer_1", Fencer, true)
    fencer_1?: Fencer = undefined

    @JsonProperty("fencer_2", Fencer, true)
    fencer_2?: Fencer = undefined

    @JsonProperty("fencer_1_id", Number, true)
    fencer_1_id?: number = undefined

    @JsonProperty("fencer_2_id", Number, true)
    fencer_2_id?: number = undefined

    matchScores?: MatchScore[] = undefined

    @JsonProperty("state", MatchStateConverter)
    state?: MatchState = undefined
}