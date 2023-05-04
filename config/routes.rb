Rails.application.routes.draw do
  
  resources :sales_post_tags
  resources :tags
  resources :users
  resources :conversations do
    resources :messages, only: [:index, :create]
  end
  resources :sales_posts

  patch '/profile/:id', to: 'users#update'
  get '/profile/:id', to: 'users#show'
  get '/tag/:id', to: 'tags#show'
  post "/signup", to: "users#create"
  get "/me", to: "users#me"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
