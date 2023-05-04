import Conversation from "./Conversation"

function ConversationList({ conversations, selectedConversation, handleConversationClick }) {
    return (
        <div>
            <h2>Conversations</h2>
            {conversations.length > 0 ? (
                <ul>
                    {conversations.map((conversation) => (
                        <Conversation
                            key={conversation.id}
                            conversation={conversation}
                            selectedConversation={selectedConversation}
                            handleConversationClick={handleConversationClick}
                        />
                    ))}
                </ul>
            ) : (
                <p>No conversations</p>
            )}
        </div>
    )
}

export default ConversationList
