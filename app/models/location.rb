class Location < ApplicationRecord
  belongs_to :planet
  validates_presence_of :specie, :location
end
