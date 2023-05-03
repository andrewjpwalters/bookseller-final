class CreateSalesPostTags < ActiveRecord::Migration[6.1]
  def change
    create_table :sales_post_tags do |t|
      t.belongs_to :sales_post, null: false, foreign_key: true
      t.belongs_to :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
