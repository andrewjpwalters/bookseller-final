class TagsController < ApplicationController
    def show
        tag = Tag.find(params[:id])
        # sales_posts = tag.sales_posts
        render json: tag
      end
end
