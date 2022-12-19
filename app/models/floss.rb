class Floss < ApplicationRecord
    has_many :user_flosses
    has_many :users, through: :user_flosses
    has_many :project_colors
    has_many :projects, through: :project_colors
end
