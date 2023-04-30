class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :sender, :recipient
  has_one :sales_post
end
