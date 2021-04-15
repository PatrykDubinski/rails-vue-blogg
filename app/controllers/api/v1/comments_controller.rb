module Api
  module V1
    class CommentsController < ApplicationController
      before_action :set_comment, only: %i[ show edit update destroy ]
      before_action :authenticate_user!

      # GET /comments or /comments.json
      def index
        @post = Post.find(params[:post_id])
        @comments = @post.comments.order('created_at DESC')
        coms = []
        @comments.each do |com|
          coms.push({"comment" => com, "user" => com.user})
        end

        render json: {comments: coms}, status: :ok
      end

      # GET /comments/1 or /comments/1.json
      def show
      end

      # POST /comments or /comments.json
      def create
        @post = Post.find(params[:post_id])

        if @post.comments.create(comment_params.merge(user_id: @current_user_id))
          render json: { msg: "Created" }, status: :created
        else
          render json: { errors: @post.errors, msg: "Not created" }, status: :unprocessable_entity
        end

      end

      # DELETE /comments/1 or /comments/1.json
      def destroy
        authorize Comment
        @comment.destroy
        render json: { message: "Comment destroyed successfully" }, status: :ok
      end

      private
      # Use callbacks to share common setup or constraints between actions.
      def set_comment
        @comment = Comment.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def comment_params
        params.require(:comment).permit(:body)
      end
    end

  end
end