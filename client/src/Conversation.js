import { useContext } from "react"
import { UserContext } from "./context/user"

function Conversation({ conversation, selectedConversation, handleConversationClick }) {
    const { user } = useContext(UserContext)

    return (
        <div onClick={() => handleConversationClick(conversation)}
            style={{
                fontWeight:
                    selectedConversation && conversation.id === selectedConversation.id
                        ? 'bold'
                        : 'normal',
            }}>
            {user.id === conversation.sender.id ? (
                <p>
                    Started by: You
                    -
                    Book: {conversation.sales_post.book_title}
                </p>
            ) : (
                <p>
                    Started by: {conversation.sender.username} -
                    Book: {conversation.sales_post.book_title}
                </p>
            )}
        </div>
    )
}

export default Conversation