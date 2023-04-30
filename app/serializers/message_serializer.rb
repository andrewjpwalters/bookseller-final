class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :sender
  has_one :conversation
end
