class CreateLocations < ActiveRecord::Migration[5.1]
  def change
    create_table :locations do |t|
      t.string :specie
      t.string :location
      t.belongs_to :planet, foreign_key: true

      t.timestamps
    end
  end
end
