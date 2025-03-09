export type TSplitType = "work" | "break" | "big-break"

export interface ISplit {
    id: string
    startTime: number
    endTime?: number
    type: TSplitType
}

export interface ISplitClass extends ISplit {
    setEndTime(endTime: number): void
}
