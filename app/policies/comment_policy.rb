class CommentPolicy
  # attr_reader :current_user, :model
  #
  # def initialize(current_user, model)
  #   @current_user = @current_user_id
  #   @model = model
  # end

  def edit?
    @current_user_id.admin?
  end

  def destroy?
    @current_user_id.admin?
  end

end