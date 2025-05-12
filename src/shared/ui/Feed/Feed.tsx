import { ISplit } from "../../../entities/split/split.types"
import Split from "../Split/Split"

interface IFeedProps {
    splits: ISplit[]
}

const Feed = ({ splits }: IFeedProps) => {
    return (
        <div className="feed">
            {splits.map((split) => (
                <>
                    <Split key={split.id} {...split} />
                    <hr />
                </>
            ))}
        </div>
    )
}

export default Feed
