class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :bio, :image_url


  def image_url
    if object.image.attached?
      url_for(object.image)
    else
      ""
    end
  end

end
