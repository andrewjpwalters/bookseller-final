class Tag < ApplicationRecord
    has_many :sales_post_tags
    has_many :sales_posts, through: :sales_post_tags
end
