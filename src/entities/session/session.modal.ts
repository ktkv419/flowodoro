import { nanoid } from "nanoid"
import { ISessionClass } from "./session.types"
import { Split } from "../split/split.modal"
import { ISplitClass } from "../split/split.types"

export class Session implements ISessionClass {
    id: string
    amountOfBreaks: number
    ratio: number
    splits: ISplitClass[]
    isDone: boolean

    constructor(amountOfBreaks: number, ratio: number) {
        this.id = nanoid()
        this.splits = [new Split(new Date().getTime(), "work")]
        this.amountOfBreaks = amountOfBreaks
        this.ratio = ratio
        this.isDone = false
    }

    setDone(isDone: boolean) {
        this.isDone = isDone
    }
}