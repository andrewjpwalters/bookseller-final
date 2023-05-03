class SalesPostTag < ApplicationRecord
  belongs_to :sales_post
  belongs_to :tag
end
