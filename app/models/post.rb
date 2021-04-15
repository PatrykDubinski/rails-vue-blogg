class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
  belongs_to :user

  validates :title, presence: true, length: { in: 5..55 }
  validates :body, presence: true, length: { in: 15..255 }
end
