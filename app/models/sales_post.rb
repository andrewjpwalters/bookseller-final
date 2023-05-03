class SalesPost < ApplicationRecord
  has_one_attached :image
  
  belongs_to :user
  has_many :conversations

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end

  validates :book_title, :author, :description, presence: true
  validates :price, presence: true , numericality: { only_integer: true }
end
