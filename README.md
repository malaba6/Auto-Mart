# Auto-Mart

[![Build Status](https://travis-ci.org/Malaba6/Auto-Mart.svg?branch=develop)](https://travis-ci.org/Malaba6/Auto-Mart)
[![Coverage Status](https://coveralls.io/repos/github/Malaba6/Auto-Mart/badge.svg?branch=develop)](https://coveralls.io/github/Malaba6/Auto-Mart?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/a9709ae873c84c6e53b5/maintainability)](https://codeclimate.com/github/Malaba6/Auto-Mart/maintainability)

## DESCRIPTION

Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.

## Link to Auto-Mart on Github Pages

[Auto-Mart](https://malaba6.github.io/Auto-Mart/)

## Link to Auto-Mart on Heroku

[Auto-Mart](https://malaba-auto-mart.herokuapp.com/api-docs/)

## Routes captured by Auto-Mart

 REQUEST | ROUTE | FUNCTIONALITY
 ------- | ----- | -------------
 **GET** | /api/v1/car | Fetches all Cars sold and unsold
 **POST** | /api/v1/car | Creates a car sale Ad
 **PATCH** | /api/v1/car/:car-id/status | Updates a car's status
 **PATCH** | /api/v1/car/:car-id/price | Updates a car's price
 **GET** | /api/v1/car/:car-id | Fetches a specific car Ad
 **GET** | /api/v1/car?status=available | Fetches all unsold car Ads
 **GET** | /api/v1/car?status=available&min_price=XValue&max_price=XValue | Fetches unsold cars within a price range
 **GET** | /api/v1/car?status=available&state=new | Fetches unsold new cars
 **GET** | /api/v1/car?status=available&state=used | Fetches unsold used cars
 **GET** | /api/v1/car?status=available&manufacturer=XXXValue | Fetches all unsold cars with specified manufacturer
 **GET** | /api/v1/car?status=available&type=XXXValue | Fetches unsold cars with specified body type
 **DELETE** | /api/v1/car/:car-id | Deletes a Car Ad
 **POST** | /api/v1/auth/signup | Creates a new User
 **POST** | /api/v1/auth/signin | Signs the user in
 **POST** | /api/v1/order | Creates a purchase order
 **PATCH** | /api/v1/order/:order-id/price | Updates purchase offered price
 **POST** | /api/v1/flag | Flags a posted car Ad as fraudulent

For more details about endpoints [check the documentation here](https://github.com/Malaba6/Auto-Mart)



## BUIT WITH

 * Javascript
 * NodeJs
 * ExpressJs

## TESTING TOOLS

 * Mocha
 * Chai
 * nyc

## HOW TO RUN THE APPLICATION

 ### SETING UP THE ENVIRONMENT
 
 1. Clone this repository to your local PC

    **` git clone https://github.com/Malaba6/Auto-Mart.git `** [here](https://github.com/Malaba6/Auto-Mart)


 2. You need to have Nodejs and npm installed

    **`$ node --version`**  To check if node is intalled. If not installed, [download here](https://nodejs.org/en/download/)

    **`$ npm --version`**   To check if the node package manager is istalled
 3. Then

    **`$ npm install`**   To install all the application dependencies

 4. And make sure postgresql is install in your system

    * Make sure database name is automart
    * Test db is test_automart
    * User name is postgres 


 ### RUN THE APP

 1. To run the app

    **` npm start `**

 2. To run tests

    **`  npm test `**


## Author

**Malaba Eric**