import { useContext } from "react"
import { UserContext } from "./context/user"

function Message({ content, sender }) {
    const { user } = useContext(UserContext)

    return (
        <div>
            {user.username === sender ? (
                <>
                    <p className="fw-bold text-primary">{content}</p>
                    <p className="fst-italic text-primary">Sent by you</p>
                </>
            ) : (
                <>
                    <p className="fw-bold text-danger">{content}</p>
                    <p className="fst-italic text-danger">Sent by {sender}</p>
                </>
            )}
        </div>
    )
}
export default Message