# Marketplace App

Marketplace App is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js) that allows users to list and browse products for sale. The application includes features such as user authentication, profile management, product management, shopping cart, and more.

## Features

- **User Authentication:** Users can register and log in to access additional features.
- **Profile Updates:** Users can update their profile info like email, password, and address.
- **Product Management:** Users can list products for sale, edit existing products, and delete them.
- **Shopping Cart:** Users can add products to their shopping cart and manage their cart items.
- **Responsive Design:** The application is styled using modern CSS and Bootstrap for a responsive and user-friendly interface.

## Technologies Used

- **Frontend:** React, Axios, Bootstrap
- **Backend:** Node.js, Express
- **Database:** MongoDB (using MongoDB Atlas)
- **Cloudinary:** For image hosting and management

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB Atlas account set up with a cluster.
- Cloudinary account for image hosting.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/PaoloFiol/Marketplace-App.git
   cd Marketplace-App

2. **Install server dependencies**

    ```bash
    cd server
    npm install

3. **Install client dependencies**

    ```bash
    cd ../client
    npm install

4. **Create a '.env' file in the 'server' directory and add these env variables with your own keys**

    ```bash
    MONGO_URI=your_mongo_atlas_connection_string
    JWT_SECRET=your_jwt_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

5. **Run the server in 'server' directory**

    ```bash
    cd ../server
    npm start

6. **In a separate terminal, run the client in 'client' directory**

    ```bash
    cd ../client
    npm start
