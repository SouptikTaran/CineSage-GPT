
# CineSage
CineSage is a versatile platform designed for exploring TV shows and movie trailers, checking ratings, and searching for movies. It incorporates advanced AI capabilities from llamaai for personalized movie suggestions based on user queries.

[![Netlify Status](https://api.netlify.com/api/v1/badges/ed402c96-e6f7-4988-8cc6-f055b9f2f688/deploy-status)](https://app.netlify.com/sites/cinesage-gpt/deploys)

Check out the live site at https://cinesage-gpt.netlify.app/ to see CineSage in action!
CREDS : test@cinesage.com : Test@123

## Features

- **Explore Movies and TV Shows**: Browse through a vast collection of movies and TV shows.
- **Watch Trailers**: View trailers directly on the platform to get a preview of the content.
- **Check Ratings**: Get detailed ratings and reviews to help make informed viewing decisions.
- **Search Movies**: Easily search for specific movies using keywords.
- **AI Movie Search**: Utilize llamaai's AI capabilities to discover movies tailored to your preferences and queries.

## Technologies Used

CineSage is built using modern technologies to provide a seamless user experience:

- **React JS**: Frontend framework for building responsive and dynamic user interfaces.
- **Firebase**: Authentication service for secure user authentication and management.
- **Tailwind CSS**: Utility-first CSS framework for fast and customizable styling without writing custom CSS.
- **Axios**: Promise-based HTTP client for making API requests to fetch data.
- **TMDB API**: The Movie Database API provides rich movie and TV show data, including details, trailers, and ratings.
- **Redux**: State management library to efficiently manage application state.
- **Flowbite**: UI component library based on Tailwind CSS for building consistent and reusable UI components.

## Getting Started

To run CineSage locally and start exploring:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/cinesage.git
   cd cinesage

2. **Install dependencies:**

    ```bash
    npm install

3. **Configure API Keys:**

- Obtain an API key from llamaai for AI-based movie suggestions and add it to **`src/constants.js`**.

- Obtain an API key from TMDB and add it to **`src/constants.js`**

4. **Configure Firebase:**

Update the Firebase configuration in **`src/utils/firebaseConfig.js`** with your Firebase project credentials.

5.**Run the application:**

        npm start

Open the application:
Navigate to http://localhost:3000 in your web browser to view and interact with CineSage.

# **Contributing**
We welcome contributions to enhance CineSage further. If you have suggestions, feature requests, or bug reports, please open an issue or submit a pull request. Your contributions are greatly appreciated!

