class CreateUserFlosses < ActiveRecord::Migration[6.1]
  def change
    create_table :user_flosses do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :floss, null: false, foreign_key: true

      t.timestamps
    end
  end
end
