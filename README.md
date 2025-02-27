# StackOverflow Clone

A simplified Stack Overflow-like web application built with Node.js, Express, MongoDB, and EJS.

Kindly find the video demo in the following link : [Watch the video](https://drive.google.com/file/d/1gYmtgtEFlirxJKE6_vGLb1QPvaPExEdi/view?usp=sharing)


## Features

- User Authentication
  - User registration and login using JWT for authentication.

- Question and Answer Management
  - Users can post new questions with a title, description, and date.
  - Users can post answers to questions, which are linked to the corresponding question and include the date.

- Basic User Profiles
  - Each user has a profile displaying their questions asked and answers provided.

## Technical Stack

- Backend:
  - Node.js
  - Express.js
  - MongoDB (Mongoose for ORM)
  - JWT for authentication
  - EJS (Embedded JavaScript) for templating

- Frontend:
  - HTML
  - CSS
  - JavaScript

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/stackoverflow-simplified.git
   cd stackoverflow-simplified

2. Install necessary packages:
   ```sh
   npm install

3. Run the app using nodemon:
   ```sh
   nodemon app.js   
