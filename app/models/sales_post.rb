class SalesPost < ApplicationRecord
  has_one_attached :image
  
  belongs_to :user
  has_many :conversations
  has_many :sales_post_tags, dependent: :destroy
  has_many :tags, through: :sales_post_tags 

  validates :book_title, :author, :description, presence: true
  validates :price, presence: true , numericality: { only_integer: true }
  
end
