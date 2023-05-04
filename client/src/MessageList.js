import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
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
            <Link className="text-reset" to={`/sales/${conversation.sales_post.id}`}>
                <h5>
                    Original Listing: {conversation.sales_post.book_title} -
                    ${conversation.sales_post.price}
                </h5>
            </Link>
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