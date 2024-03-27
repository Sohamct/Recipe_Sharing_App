// import React from 'react';
// import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { RootLayout } from './components/Recipes/RootLayout';
// import { Signup } from './components/Auth/Signup';
// import { Login } from './components/Auth/Login';
// import { RecipeShow } from './components/Recipes/RecipeList/RecipeItem/RecipeShow';
// import { CreateRecipe } from './components/Recipes/CreateRecipe/CreateRecipe';
// import LogoutInfoPage from './components/Auth/LogoutInfoPage';
// import UserProfile from './components/User/userProfile';
// import FavoriteRecipesPage from './components/Favorites/FavoriteRecipePage.js';
// import { SearchResults } from './components/Recipes/SearchRecipe/SearchResults.js';
// import { SearchRecipe } from './components/Recipes/SearchRecipe/SearchRecipe.js';
// import { ToastContainer } from 'react-toastify';
// import Chat from './components/Chat/Chat';
// import './App.css';
// import { MyRecipe } from './components/MyRecipe/MyRecipe.js';

// // Define the ErrorHandle component
// const ErrorHandle = () => {
//   return (
//     <div>
//       <h1>Error</h1>
//       <p>Oops! Something went wrong.</p>
//     </div>
//   );
// };

// // Define your routes
// const routes = [
//   { path: "/", element: <Navigate to="/recipe" replace /> },
//   { path: "/recipe", element: <RootLayout /> },
//   { path: "/search", element: <SearchRecipe /> },
//   { path: "/newrecipe", element: <CreateRecipe /> },
//   { path: "/editrecipe/:id", element: <CreateRecipe /> },
//   { path: "/login", element: <Login /> },
//   { path: "/signup", element: <Signup /> },
//   { path: "/logout", element: <LogoutInfoPage /> },
//   { path: "/user-profile/:username", element: <UserProfile /> },
//   { path: "/viewrecipe/:id", element: <RecipeShow /> },
//   { path: "/search-results", element: <SearchResults /> },
//   { path: "/favorite", element: <FavoriteRecipesPage /> },
//   { path: "/chat", element: <Chat /> },
//   { path: '/myrecipe', element: <MyRecipe /> },
//   { path: '/error', element: <ErrorHandle /> }, // Error route
//   { path: '*', element: <Navigate to="/error" replace /> }, // Fallback route
// ];

// // Create the router
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       {routes.map((route, index) => (
//         <Route key={index} {...route} />
//       ))}
//     </Route>
//   )
// );

// // App component
// function App() {
//   return (
//     <RouterProvider router={router}>
//       <ToastContainer />
//     </RouterProvider>
//   );
// }

// export default App;


import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RootLayout } from './components/Recipes/RootLayout';
import { Signup } from './components/Auth/Signup';
import { Login } from './components/Auth/Login';
import { RecipeShow } from './components/Recipes/RecipeList/RecipeItem/RecipeShow';
import { CreateRecipe } from './components/Recipes/CreateRecipe/CreateRecipe';
import LogoutInfoPage from './components/Auth/LogoutInfoPage';
import UserProfile from './components/User/userProfile';
import FavoriteRecipesPage from './components/Favorites/FavoriteRecipePage.js';
import { SearchResults } from './components/Recipes/SearchRecipe/SearchResults.js';
import { SearchRecipe } from './components/Recipes/SearchRecipe/SearchRecipe.js';
import { ToastContainer } from 'react-toastify';
import  Chat  from './components/Chat/Chat';
import './App.css'
import { MyRecipe } from './components/MyRecipe/MyRecipe.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navigate to="/recipe" replace />} />
      <Route path="/recipe" element={<RootLayout />} />
      <Route path="/search" element={<SearchRecipe />} />
      <Route path="/newrecipe" element={<CreateRecipe />} />
      <Route path="/editrecipe/:id" element={<CreateRecipe />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<LogoutInfoPage />} />
      <Route path="/user-profile/:username" element={<UserProfile />} />
      <Route path="/viewrecipe/:id" element={<RecipeShow />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/favorite" element={<FavoriteRecipesPage />} />
      <Route path="/chat" element={<Chat />} />
      <Route path='/myrecipe' element={<MyRecipe/>} />
      {/* <Route path='/*' element={<ErrorHandle/>} /> */}
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router}>
      <ToastContainer />
    </RouterProvider>
  );
}

export default App;

// import React from 'react';
// import {
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   Navigate
// } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { RootLayout } from './components/Recipes/RootLayout';
// import { Signup } from './components/Auth/Signup';
// import { Login } from './components/Auth/Login';
// import { RecipeShow } from './components/Recipes/RecipeList/RecipeItem/RecipeShow';
// import { CreateRecipe } from './components/Recipes/CreateRecipe/CreateRecipe';
// import LogoutInfoPage from './components/Auth/LogoutInfoPage';
// import UserProfile from './components/User/userProfile';
// import FavoriteRecipesPage from './components/Favorites/FavoriteRecipePage.js';
// import { SearchResults } from './components/Recipes/SearchRecipe/SearchResults.js';
// import { SearchRecipe } from './components/Recipes/SearchRecipe/SearchRecipe.js';
// import { ToastContainer } from 'react-toastify';
// import  Chat  from './components/Chat/Chat';
// import './App.css'
// import { MyRecipe } from './components/MyRecipe/MyRecipe.js';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path="/" element={<Navigate to="/recipe" replace />} />
//       <Route path="/recipe" element={<RootLayout />} />
//       <Route path="/search" element={<SearchRecipe />} />
//       <Route path="/newrecipe" element={<CreateRecipe />} />
//       <Route path="/editrecipe/:id" element={<CreateRecipe />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/logout" element={<LogoutInfoPage />} />
//       <Route path="/user-profile/:username" element={<UserProfile />} />
//       <Route path="/viewrecipe/:id" element={<RecipeShow />} />
//       <Route path="/search-results" element={<SearchResults />} />
//       <Route path="/favorite" element={<FavoriteRecipesPage />} />
//       <Route path="/chat" element={<Chat />} />
//       <Route path='/myrecipe' element={<MyRecipe/>} />
//     </Route>
//   )
// );

// function App() {
//   return (
//     <RouterProvider router={router}>
//       <ToastContainer />
//     </RouterProvider>
//   );
// }

// export default App;
