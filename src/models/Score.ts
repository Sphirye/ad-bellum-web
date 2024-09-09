export enum ExchangeType {
  DOUBLE = "DOUBLE",
  POINT = "POINT",
  NO_EXCHANGE = "NO_EXCHANGE",
  NO_QUALITY = "NO_QUALITY"
}

export default class Score {
  time?: string = undefined
  region?: string = undefined
  warnings?: [string] = undefined
  attackType?: string = undefined
  exchange?: ExchangeType = undefined
}