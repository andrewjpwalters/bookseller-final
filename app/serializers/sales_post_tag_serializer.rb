class SalesPostTagSerializer < ActiveModel::Serializer
  attributes :id
  has_one :sales_post
  has_one :tag
end
