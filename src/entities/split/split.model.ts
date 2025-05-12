import { nanoid } from "nanoid"
import { ISplit, TSplitType } from "./split.types"

export class Split implements ISplit {
    id
    startTime
    endTime?
    type

    constructor(startTime: number, type: TSplitType, endTime?: number) {
        this.id = nanoid()
        this.startTime = startTime
        this.endTime = endTime
        this.type = type
    }

    setEndTime(endTime: number) {
        this.endTime = endTime
    }
}
