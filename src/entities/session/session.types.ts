import { ISplit } from "../split/split.types"

export interface ISessionSettings {
    amountOfBreaks: number
    ratio: number
}

export interface ISession extends ISessionSettings {
    splits: ISplit[]
    isDone: boolean
}

export interface ISessionClass extends ISession {
    id: string
    setDone(isDone: boolean): void
}
