import { nanoid } from "nanoid"
import { ISessionClass } from "./session.types"
import { Split } from "../split/split.model"

export class Session implements ISessionClass {
    id
    amountOfBreaks
    ratio
    splits
    isDone

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