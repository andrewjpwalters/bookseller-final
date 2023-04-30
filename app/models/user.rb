class User < ApplicationRecord
    has_many :sent_conversations, class_name: 'Conversation', foreign_key: 'sender_id'
    has_many :received_conversations, class_name: 'Conversation', foreign_key: 'recipient_id'
    has_many :messages
    has_many :sales_posts

    has_secure_password

    validates :username, presence: true, uniqueness: true
end
