# NEWTON - Car dealership website

In this is project, we built a full-stack interactive online marketplace for cars that supports checkout and admin functions for over 2000 cars. This app uses react for its frontend and express/node.js as its backend which interacts with our MySQL database. 

## To run the project:

1. Download the project directory. Ensure node and yarn are installed. 
2. In MySQL, run the script DBAdump.sql in the sql folder to create the database
3. Open 2 node-enabled command prompts and cd to the project directory in both

**yarn install is not necessary in steps 4-5 if the directories already have a 'node modules' folder**

4. install server dependencies: in one command prompt, cd server && yarn install
5. install frontend dependencies: in the other prompt, cd client && yarn install
6. Run 'yarn start' in both the server & client terminals
7. localhost:3000 automatically opens in browser

## Key Features of the Website and it's implementation:
1. Users can buy product. review past orders and can add mutiple cars to the cart and choose the store of choice.
2. Users can search products & rerank products based on price
3. Passwords are now stored as hashes in the database. Remember your password, as the database values can't be returned to plaintext once entered! Upon login, the password entered in the front-end is hashed and compared to the database value from the server.
4. During customer registration, phone numbers and emails now are checked for the correct format. Phones: 10 digits with no delimiters, or '+' and up to 12 digit (for international numbers) email: requires a nonempty string, then the '@' symbol, and another non-empty string. 

## Responsibilities:

1. Designed an online marketplace for luxury cars, built the Frontend and UI (User Interface) components for the website with detail pages for each car, a checkout page, and an order detail page using ReactJS, HTML, and CSS.
2. 	Led the team developing and enhancing various backend features such as password encryption using NodeJS and MySQL.
