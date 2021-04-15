class Admin::PostsController < ApplicationController
  before_action :set_post, only: %i[ show edit update destroy ]

  def new
    @post = Post.new
    authorize Post
  end

  # GET /posts/1/edit
  def edit
    authorize Post
  end

  def destroy
    authorize Post
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, notice: "Post was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    if @post.update(post_params)
      redirect_to root_path
    end
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :body)
  end

end