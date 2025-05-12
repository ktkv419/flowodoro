export type TSplitType = "work" | "break" | "big-break"

export interface ISplit {
    id: string
    startTime: number
    endTime?: number
    type: TSplitType
    setEndTime(endTime: number): void
}
