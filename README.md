# BOOKSELLER by Andrew Walters

Phase 5 final project for Flatiron School

## Installation

Run bundle install to install dependencies on API:

```bash
bundle install
```

Run Rails database create to create the database:

```bash
rails db:create
```

Run npm install to install dependencies on React frontend: 

```bash
npm install --prefix client
```

Start the server: 

```bash
rails s
```

Start the application:

```bash
npm start --prefix client
```


## Usage

This is an application built with Ruby on Rails and React with photo storage support from Active Storage and Amazon S3. It functions as a marketplace where users are able to list and sell books. Users are able to create a profile and then log in to submit sales posts with tags and with an accompanying image that will be stored on S3. Users can edit and delete their own posts. Users are then able to make offers on other users' sales posts, initiating a coversation in which the users will be able to send messages back and forth. Authorizaion ensures that users are not able to affect other users' content. 

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Acknowledgements

React Bootstrap (https://react-bootstrap.github.io/)

React Router Bootstrap (https://github.com/react-bootstrap/react-router-bootstrap)

React Markdown (https://remarkjs.github.io/react-markdown/)

Home page photo by Mikołaj on Unsplash (https://unsplash.com/@qmikola?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).