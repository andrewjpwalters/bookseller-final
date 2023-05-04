import { useState, useEffect } from "react"
import ConversationList from "./ConversationList"
import MessageList from "./MessageList"

function Inbox() {
    const [conversations, setConversations] = useState([])
    const [selectedConversation, setSelectedConversation] = useState(null)

    useEffect(() => {
        fetch("/conversations")
            .then((r) => r.json())
            .then((data) => setConversations(data));
    }, []);

    function handleConversationClick(conversation) {
        setSelectedConversation(conversation)
    }


    return (
        <div>
            <h1>Hello from Inbox!</h1>
            <ConversationList
                conversations={conversations}
                handleConversationClick={handleConversationClick}
                selectedConversation={selectedConversation}
            />
            {selectedConversation && (
                <MessageList
                    conversation={selectedConversation}
                />
            )}
        </div>
    )
}

export default Inbox