# ACCLERATED_TASK

1) Clone repo using "git clone https://github.com/Jalaj-Kalra/ACCLERATED_TASK.git"
2) npm start ( to start node server for backend )
3) cd client
4) npm start ( to start frontend server )


Part 1: NodeJS ********************************************************************************************
1) Create a NodeJS server that listens on port 3000 and responds to the route "/hello" with the message "Hello World!".
Solution: Open-> http://localhost:8000/hello
<img width="665" alt="Screenshot 2023-06-01 at 5 56 59 PM" src="https://github.com/Jalaj-Kalra/ACCLERATED_TASK/assets/86240969/c09b49b5-3007-45f7-af9e-1e0618cc6d0f">

2) Create a function in NodeJS that takes in an array of integers and returns the sum of all even numbers in the array.
Solution: Uncomment line number 25 to 36 ( index.js )
<img width="1242" alt="Screenshot 2023-06-01 at 5 58 33 PM" src="https://github.com/Jalaj-Kalra/ACCLERATED_TASK/assets/86240969/16ea9524-b39b-4fe9-9b47-64c4970b1752">

3) Create a function in NodeJS which runs automatically every 5 seconds and puts a message (“”QUERY RUNNING) in console.
Solution: Uncomment line number 39 to 43 ( index.js )
https://github.com/Jalaj-Kalra/ACCLERATED_TASK/assets/86240969/a37fa0d1-970d-4e29-ac12-a1fa9522b204



Part 2: MongoDB ********************************************************************************************
1) Create a MongoDB database called "testdb" with a collection called "users".
Solution: <img width="1315" alt="Screenshot 2023-06-01 at 6 00 57 PM" src="https://github.com/Jalaj-Kalra/ACCLERATED_TASK/assets/86240969/60754db5-e2a1-4d0e-aba4-3d4782c3d625">

2) Add a new user to the "users" collection with the following information:
• Name: John Doe
• Email: john.doe@example.com
• Password: password123
• Token (USE JWT for tokens)
Solution: routes->user.js
<img width="1125" alt="Screenshot 2023-06-01 at 6 23 14 PM" src="https://github.com/Jalaj-Kalra/ACCLERATED_TASK/assets/86240969/f34258c2-df36-43c5-a954-1c3b9d530f0a">

3) Write a MongoDB query that retrieves all users with the email domain "example.com".
Solution: const users = await User.find({email: {"$regex":req.body.emailDomain}});
<img width="1109" alt="Screenshot 2023-06-01 at 6 03 47 PM" src="https://github.com/Jalaj-Kalra/ACCLERATED_TASK/assets/86240969/a1c4887a-fd86-4343-b976-114af180a8ff">



Part 3: ReactJS ********************************************************************************************
1) Create a React component that displays a list of user names and email addresses. The component should receive an array of user objects as a prop.
Solution:
<img width="1512" alt="Screenshot 2023-06-01 at 6 04 12 PM" src="https://github.com/Jalaj-Kalra/ACCLERATED_TASK/assets/86240969/cfde3ed7-06f6-41ec-9a32-ca887097a8f1">

2) Create a ref inside each of above component and show in console on click of component element.
Solution:
<img width="1512" alt="Screenshot 2023-06-01 at 6 05 51 PM" src="https://github.com/Jalaj-Kalra/ACCLERATED_TASK/assets/86240969/14aa1059-f342-4db8-b611-de35ef7081ee">

3) Create a Multi-step (2 steps) form in React that allows users to add a new user to the list.
Information should be captured in two steps and user should be able to go back and forth. The form should have
fields for name, email, and password.
Solution:
https://github.com/Jalaj-Kalra/ACCLERATED_TASK/assets/86240969/705e827e-b902-4bb9-84b3-5dfecdbd4057




Part 4: GraphQL ********************************************************************************************
1) Create a GraphQL schema that defines the following types:
• User: id, name, email, password
• Query: getUsers, getUserById
• Mutation: createUser, updateUser, deleteUser
2) Implement the resolvers for the Query and Mutation types.
3) Write a GraphQL query that retrieves all users from the database.

Solutions:

<img width="1511" alt="Screenshot 2023-06-01 at 5 54 24 PM" src="https://github.com/Jalaj-Kalra/ACCLERATED_TASK/assets/86240969/1eda6870-776f-4bd8-bb6b-1e2f6489a621">
<img width="1511" alt="Screenshot 2023-06-01 at 5 54 43 PM" src="https://github.com/Jalaj-Kalra/ACCLERATED_TASK/assets/86240969/6e096ddc-0481-437f-a0c5-338d023af323">
<img width="1512" alt="Screenshot 2023-06-01 at 5 55 12 PM" src="https://github.com/Jalaj-Kalra/ACCLERATED_TASK/assets/86240969/2feed4e2-911f-4bd8-b1a3-74da2cc59e9c">
<img width="1510" alt="Screenshot 2023-06-01 at 5 55 46 PM" src="https://github.com/Jalaj-Kalra/ACCLERATED_TASK/assets/86240969/b46684e9-2ef4-4a4d-85c1-a15a8d1bea9c">


