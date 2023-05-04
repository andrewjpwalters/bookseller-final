class SalesPostsController < ApplicationController
  def index
    render json: SalesPost.all
  end
          
  def create
    sales_post = @current_user.sales_posts.new(sales_post_params)
    tags = params[:tag_names].map do |tag_name|
      Tag.find_or_create_by(name: tag_name)
    end

    sales_post.tags << tags

    if sales_post.save
      render json: sales_post, status: :created
    else
      render json: sales_post.errors, status: :unprocessable_entity
    end
  end
    
  def show
    sales_post = SalesPost.find_by(id: params[:id])
        
    if sales_post
      render json: sales_post, status: :ok
    else
      render json: {error: "Sale not found"}, status: :not_found
    end
  end
          
  def update
    sales_post = SalesPost.find_by(id: params[:id])
    return render json: {errors: "Not Authorized"}, status: :unauthorized unless sales_post && sales_post.user_id == @current_user&.id
          
    if sales_post.update(sales_post_params)
      render json: sales_post, status: :accepted
    else
      render json: {errors: "Sales Post not found"}, status: :not_found
    end
  end
          
  def destroy
    sales_post = SalesPost.find_by(id: params[:id])
    return render json: {errors: "Not Authorized"}, status: :unauthorized unless sales_post && sales_post.user_id == @current_user&.id
          
    if sales_post
      sales_post.destroy
      head :no_content
    else
      render json: {errors: "Sales Post not found"}, status: :not_found
    end
  end
          
          
  private
          
  def sales_post_params
    params.permit(:book_title, :price, :description, :author, :image)
  end
end
