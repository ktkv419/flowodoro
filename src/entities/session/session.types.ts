import { ISplitClass } from "../split/split.types"

export interface ISessionSettings {
    amountOfBreaks: number
    ratio: number
}

export interface ISession extends ISessionSettings {
    splits: ISplitClass[]
    isDone: boolean
}

export interface ISessionClass extends ISession {
    id: string
    setDone(isDone: boolean): void
}
