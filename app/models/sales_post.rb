class SalesPost < ApplicationRecord
  has_one_attached :image
  
  belongs_to :user
  has_many :conversations

  validates :book_title, :author, :description, presence: true
  validates :price, presence: true , numericality: { only_integer: true }
  
end
