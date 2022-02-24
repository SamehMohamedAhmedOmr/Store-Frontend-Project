# Requirements

## API ENDPOINTS

### Auth

Postman link => https://documenter.getpostman.com/view/18438451/UVkmQx4M#ea2094e6-b3e6-41f2-88c0-4cd925dcb61c

- login 
- Register

### Users

**Endpoints**

api/users

**Postman Link** 

> https://documenter.getpostman.com/view/18438451/UVkmQx4M#1536f6dd-22ae-4104-838b-2b9eabf8be6a

- List  , **GET /api/users** 
- Create , **POST /api/users**
- Get , **GET /api/users/:id**
- Update , **PUT /api/users/:id**

**Database Schema** 

Table name **users**

| Column        | Type                  |   
| ------------- |-----------------------|
| id            | INTEGER - PRIMARY KEY |
| email         | VARCHAR(255)          |
| password      | VARCHAR(255)          |  
| first_name    | VARCHAR(255)          |  
| last_name     | VARCHAR(255)          |  
| type          | INTEGER               |  


### Categories

**Endpoints**

 api/categories,

**Postman Link**

> https://documenter.getpostman.com/view/18438451/UVkmQx4M#c278ad8e-a546-4805-ad5c-e9067fc34e9b

- List  , **GET /api/categories**
- Create , **POST /api/categories**
- Get , **GET /api/categories/:id**
- Update , **PUT /api/categories/:id**

**Database Schema**

Table name **categories**

| Column        | Type                  |   
| ------------- |-----------------------|
| id            | INTEGER - PRIMARY KEY |
| name          | VARCHAR(255)          |


### Products

**Endpoints**

api/products,

**Postman Link**

> https://documenter.getpostman.com/view/18438451/UVkmQx4M#7b4ce4af-7240-4134-b8a2-874acc96d2fd

- List  , **GET /api/products**
- Create , **POST /api/products**
- Get , **GET /api/products/:id**
- Update , **PUT /api/products/:id**
- filter by category, **GET /api/products?category_id=1**
- Most viewed product **GET /api/products-most-viewed**


**Database Schema**

Table name **products**

| Column        | Type                  |   
| ------------- |-----------------------|
| id            | INTEGER - PRIMARY KEY |
| name          | VARCHAR(255)          |
| price         | FLOAT                 |  
| category_id   | INTEGER               |
| views         | INTEGER               |  


### Cart

**Endpoints**

api/cart,

**Postman Link**

> https://documenter.getpostman.com/view/18438451/UVkmQx4M#6318ab14-2f78-4dcc-b756-573dff3906b1

- List  , **GET /api/cart**
- Create , **POST /api/cart**
- delete , **DELETE /api/cart/:id**

**Database Schema**

Table name **cart**


| Column        | Type                  |   
| ------------- |-----------------------|
| id            | INTEGER - PRIMARY KEY |
| user_id       | INTEGER               |


Table name **cart_items**

| Column        | Type                  |   
| ------------- |-----------------------|
| id            | INTEGER - PRIMARY KEY |
| quantity      | INTEGER               |  
| cart_id       | INTEGER               |
| product_id    | INTEGER               |  


### Order

**Endpoints**

api/orders,

**Postman Link**

> https://documenter.getpostman.com/view/18438451/UVkmQx4M#fb70a45a-f238-4733-9ff2-9d26b1b087c6

- List  , **GET /api/orders**
- Create , **POST /api/orders**
- details , **GET /api/orders/:id**

Table name **orders**

| Column        | Type                  |   
| ------------- |-----------------------|
| id            | INTEGER - PRIMARY KEY |
| user_id       | INTEGER               |

Table name **order_items**

| Column        | Type                  |   
| ------------- |-----------------------|
| id            | INTEGER - PRIMARY KEY |
| quantity      | INTEGER               |  
| order_id      | INTEGER               |
| product_id    | INTEGER               |  

