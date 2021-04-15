module Api
  module V1
    class PostsController < ApplicationController
      before_action :set_post, only: %i[ show edit update destroy pdf ]
      before_action :authenticate_user!

      # GET /posts or /posts.json
      def index
        @posts = Post.all.order('created_at DESC')

        render json: @posts, status: :ok
      end

      # GET /posts/1 or /posts/1.json
      def show
        post = {"post" => @post, "author" => @post.user.email}
        render json: post, status: :ok

      end

      def pdf
        pdf_html = ActionController::Base.new.render_to_string(template: 'posts/pdfzAPI.html.erb', layout: 'pdf.html', locals: { :post => @post})
        pdf = WickedPdf.new.pdf_from_string(pdf_html, header: {
          :margin => { :bottom => 10},
          content: render_to_string("posts/pdf_headerZAPI.html.erb"),

        },margin: {
          top: 20
        }, :footer => { :right => 'Page: [page] of [topage]', :margin => { :top => 10}}, encoding: "utf8", layout: "pdf",)
        send_data pdf, filename: 'file_name.pdf'
      end

      # POST /posts or /posts.json
      def create
        authorize Post
        @post = Post.new(post_params.merge(user_id: @current_user_id))

        if @post.save
          render json: { post: @post, message: "Created" }, status: :created
        else
          render json: { errors: @post.errors.full_messages.first, message: "Not created" }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /posts/1 or /posts/1.json
      def update
        authorize Post
        if @post.update(post_params)
          render json: { post: @post, message: "Updated successfully" }, status: :created
        else
          render json: { errors: @post.errors.full_messages.first, message: "Not created" }, status: :unprocessable_entity
        end
      end

      # DELETE /posts/1 or /posts/1.json
      def destroy
        authorize Post
        @post.destroy

        render json: { message: "Post destroyed successfully" }, status: :ok

      end

      private
      # Use callbacks to share common setup or constraints between actions.
      def set_post
        @post = Post.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def post_params
        params.require(:post).permit(:title, :body)
      end
    end

  end
end