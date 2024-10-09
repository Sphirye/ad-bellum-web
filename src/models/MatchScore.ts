import { JsonConverter, JsonCustomConvert, JsonObject, JsonProperty } from "json2typescript"

export enum Verdict {
  DOUBLE = "DOUBLE",
  POINT = "POINT",
  NO_EXCHANGE = "NO_EXCHANGE",
  NO_QUALITY = "NO_QUALITY"
}

export enum PointType {
  CUT = "CUT",
  THRUST = "THRUST",
  SLICE = "SLICE",
}

@JsonConverter
class VerdictConverter implements JsonCustomConvert<Verdict> {
    deserialize(data: string): Verdict {
        return (<any>Verdict)[data]
    }
    serialize(data: Verdict): any {
        return data.toString()
    }
}

@JsonConverter
class PointTypeConverter implements JsonCustomConvert<PointType> {
    deserialize(data: string): PointType {
        return (<any>PointType)[data]
    }
    serialize(data: PointType): any {
        return data.toString()
    }
}

@JsonObject("MatchScore")
export default class MatchScore {
  @JsonProperty("id", Number)
  id?: number = undefined

  @JsonProperty("timestamp", String, true)
  timestamp?: string = undefined

  region?: string = undefined

  warnings?: [string] = undefined

  @JsonProperty("type", PointTypeConverter, true)
  type?: PointType = undefined

  @JsonProperty("verdict", VerdictConverter, true)
  verdict?: Verdict = undefined

  @JsonProperty("matchId", Number, true)
  matchId?: number = undefined
}