import { JsonConvert, JsonConverter, JsonCustomConvert, JsonObject, JsonProperty } from "json2typescript"
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

    @JsonProperty("fencer_1", Fencer)
    fencer_1?: string = undefined

    @JsonProperty("fencer_2", Fencer)
    fencer_2?: string = undefined

    matchScores?: MatchScore[] = undefined

    @JsonProperty("state", MatchStateConverter)
    state?: MatchState = undefined
}