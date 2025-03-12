import { nanoid } from "nanoid"
import { ISplitClass, TSplitType } from "./split.types"

export class Split implements ISplitClass {
    id: string
    startTime: number
    endTime?: number
    type: TSplitType

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
