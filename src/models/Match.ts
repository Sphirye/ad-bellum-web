import MatchScore from "./MatchScore"

export enum MatchState {
    WAITING = "WAITING",
    IN_PROGRESS = "SEND",
    FINISHED = "FINISHED",
}

export default class Match {
    totalTime?: string = undefined
    fencer_1?: string = undefined
    fencer_2?: string = undefined
    matchScores?: MatchScore[] = undefined
    state?: MatchState = undefined
}