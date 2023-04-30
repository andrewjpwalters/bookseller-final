class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :sender, :recipient
  has_one :sales_post
  has_one :sender, class_name: 'User'
  has_one :recipient, class_name: 'User'
  has_many :messages
end
