class TagSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :sales_posts, include: [:user]
end
