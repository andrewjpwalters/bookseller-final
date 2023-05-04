class SalesPostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  
  attributes :id, :book_title, :author, :price, :description, :image_url
  has_one :user

  has_many :tags

  def image_url
    if object.image.attached?
      url_for(object.image)
    else
      ""
    end
  end
end
