import { ISplitClass } from "../../../entities/split/split.types"

interface IFeedProps {
    splits: ISplitClass[]
}

const Feed = ({ splits }: IFeedProps) => {
    return (
        <div className="feed">
            {splits.map((split) => (
                <>
                    <div key={split.id} className="split">
                        <div>Start: {split.startTime}</div>
                        {split.endTime && <div>End: {split.endTime}</div>}
                        <div>Type: {split.type}</div>
                        {split.endTime && <div>Duration: {split.startTime - split.endTime}</div>}
                    </div>
                    <hr />
                </>
            ))}
        </div>
    )
}

export default Feed
