import { useContext } from "react"
import { UserContext } from "./context/user"

function Message({ content, sender }) {
    const { user } = useContext(UserContext)

    return (
        <div>
            <p>{content}</p>
            {user.username === sender ? (
                <p>Sent by you</p>
            ) : (
                <p>Sent by {sender}</p>
            )}
        </div>
    )
}
export default Message