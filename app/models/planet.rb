class Planet < ApplicationRecord
	has_many :locations, dependent: :destroy
end
