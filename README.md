# chat-app-open-reach-frontend

![1](https://github.com/bharathsandepogu01/chat-app-open-reach-frontend/assets/86849197/111f653b-d3da-4bde-905c-2714c22b53d0)
![4](https://github.com/bharathsandepogu01/chat-app-open-reach-frontend/assets/86849197/2aa73eff-80d2-47ce-ab4a-7230b9c14128)
![3](https://github.com/bharathsandepogu01/chat-app-open-reach-frontend/assets/86849197/0c05feb7-8629-4ce3-ac46-ea1b71c2c3ff)

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Usage](#usage)
5. [How to Run Locally](#run-locally)

## 1. Introduction<a name="introduction"></a>

Welcome to the Chat Application. This application allows users to chat with each other in real-time, one-to-one messaging. Users can log in using Google OAuth.

## 2. Features<a name="features"></a>

### Key Features:

- **One-to-One Messaging**: Real-time one-to-one chat functionality.
- **Google Login**: Users can sign in with their Google accounts.


## 3. Technologies Used<a name="technologies-used"></a>

- React
- SASS
- TypeScript
- Redux Toolkit
- Webpack
- Socket.io Client
- indexedDB

## 4. Usage<a name="usage"></a>

1. Open the application in your web browser.
2. Log in with your Google account.
3. Start one-to-one messaging.

## 5. How to Run Locally

1. clone the repo
2. add .env file in root directory and add these
  - **CLIENT_URL**: http://localhost:3000
  - **SERVER_URL**: https://chatapp-open-reach-backend-socket-service.onrender.com
  - **GOOGLE_OAUTH_ROOT_URL**: Root URL for Google OAuth.
  - **GOOGLE_CLIENT_ID**: Client ID for Google OAuth.
  - **GOOGLE_CLIENT_SECRET**: Client secret for Google OAuth.
  - **GOOGLE_TOKEN_URL**: URL for Google OAuth token exchange.
  - **GOOGLE_USER_INFO_URL**: URL for fetching user information from Google OAuth.
3. run npm install
4. and run npm run dev
