# cointab-assignment

This assignment involves creating a simple 2-page website using Node.js and a SQL database, adhering to specific business requirements such as fetching data from an API, displaying user information, and implementing CRUD functionality for users and posts.

## Deployed Links
- Backend: [https://cointab-assignment-kko4.onrender.com]
- Backend: [https://cointab-assignment-five.vercel.app/]

## 

## Technologies Used
- Node.js
- Express.js
- SQL

## NPM Packages Used
- axios
- dotenv
- express
- cors
- sequelize
- exceljs


## API Endpoints:
- GET /user/
  - This endpoint will give list of all the users data
- POST /user/add
  - This endpoint is used to add new user in database
- POST /post/
   - This endpoint is used to add all the posts of a user
- GET /post/
  - This endpoint gives a list of posts for a particular user
- GET /post/download-excel/:userId
  - This endpoint is used to download all the posts of a particular user in an excel sheet
 
## Features
- Add users to database
- Add user's posts to database
- Download all the posts of a particular user in an excel sheet


