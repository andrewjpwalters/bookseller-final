import { useState, useEffect } from "react"
import Message from "./Message";
import NewMessageForm from "./NewMessageForm";

function MessageList({ conversation }) {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        fetch(`/conversations/${conversation.id}/messages`)
            .then((r) => r.json())
            .then((data) => {
                setMessages(data);
            });
    }, [conversation]);

    function handleAddMessage(newMessage) {
        setMessages([...messages, newMessage])
    };

    return (
        <div>
            <h3>Messages</h3>
            {messages.map((message) => (
                <Message
                    key={message.id}
                    content={message.content}
                    sender={message.user.username}
                />
            ))}
            <NewMessageForm
                conversation={conversation}
                onAddMessage={handleAddMessage}
            />
        </div>
    )
}

export default MessageList