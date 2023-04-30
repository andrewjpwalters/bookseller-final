class CreateSalesPosts < ActiveRecord::Migration[6.1]
  def change
    create_table :sales_posts do |t|
      t.string :book_title
      t.string :author
      t.integer :price
      t.string :description
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
