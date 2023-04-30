class SalesPostSerializer < ActiveModel::Serializer
  attributes :id, :book_title, :author, :price, :description
  has_one :user
end
