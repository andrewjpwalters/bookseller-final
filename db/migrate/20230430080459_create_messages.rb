class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :content
      t.belongs_to :conversation, null: false, foreign_key: true
      t.belongs_to :sender, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
