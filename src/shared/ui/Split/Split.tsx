import { ISplit } from "@/entities/split/split.types"
import { formatTimeDate, formatTime } from "@/shared/utils/getTime"

interface ISplitProps extends ISplit {}

const Split = ({ startTime, endTime, type }: ISplitProps) => {
    return (
        <div className="split">
            <div>Start: {formatTimeDate(startTime)}</div>
            {endTime && <div>End: {formatTimeDate(endTime)}</div>}
            <div>Type: {type}</div>
            {endTime && <div>Duration: {formatTime(Math.abs(startTime - endTime) / 1000)}</div>}
        </div>
    )
}

export default Split
