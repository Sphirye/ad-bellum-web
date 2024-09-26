import { JsonConverter, JsonCustomConvert, JsonProperty } from "json2typescript"

export enum Verdict {
  DOUBLE = "DOUBLE",
  POINT = "POINT",
  NO_EXCHANGE = "NO_EXCHANGE",
  NO_QUALITY = "NO_QUALITY"
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

export default class MatchScore {
  @JsonProperty("id", Number)
  id?: number = undefined

  @JsonProperty("timestamp", String)
  timestamp?: string = undefined

  region?: string = undefined

  warnings?: [string] = undefined

  @JsonProperty("timestamp", String)
  pointType?: string = undefined

  @JsonProperty("verdict", VerdictConverter)
  verdict?: Verdict = undefined
}