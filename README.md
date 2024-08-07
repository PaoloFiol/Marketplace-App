# Marketplace App

Marketplace App is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js) that allows users to list and browse products for sale. The application includes features such as user authentication, product management, shopping cart, and more.

## Features

- **User Authentication:** Users can register and log in to access additional features.
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

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/PaoloFiol/Marketplace-App.git
   cd Marketplace-App

2. **Install Server Dependencies**

    cd server
    npm install

3. **Install Client Dependencies**

    cd ../client
    npm install

4. **Create a '.env' file in the 'server' directory and add these env variables with your own keys**

    MONGO_URI=your_mongo_atlas_connection_string
    JWT_SECRET=your_jwt_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

5. **Run the application on 'http://localhost:3000'**

    In Server directory: npm start
    In Client directory: npm start
