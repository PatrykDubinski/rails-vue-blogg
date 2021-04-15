Rails.application.routes.draw do
  #devise_for :users

  root "posts#index"

  resources :posts do
    resources :comments
  end

  namespace :admin do
    resources :posts
      resources :comments
  end

  namespace :api do
    namespace :v1 do
      devise_for :users,
                 controllers: {
                   :sessions => 'api/v1/sessions',
                   :registrations => 'api/v1/registrations'
                 }
      get '/posts/:id/pdf', to: "posts#pdf"
      resources :posts do
        resources :comments
      end
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
