import React from 'react';
import { ToastContainer } from 'react-toastify';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import './App.css';
import { RootLayout } from './components/Recipes/RootLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Signup } from './components/Auth/Signup';
import { Login } from './components/Auth/Login';
import { RecipeShow } from './components/Recipes/RecipeList/RecipeItem/RecipeShow';
import { CreateRecipe } from './components/Recipes/CreateRecipe/CreateRecipe';
import LogoutInfoPage from './components/Auth/LogoutInfoPage';
import { Chat } from './components/Chat/Chat';
import UserProfile from './components/User/userProfile';
import FavoriteRecipesPage from './components/Favorites/FavoriteRecipePage.js';
import { SearchResults } from './components/Recipes/SearchRecipe/SearchResults.js';
import { SearchRecipe } from './components/Recipes/SearchRecipe/SearchRecipe.js';
import { MyRecipe } from './components/MyRecipe/MyRecipe';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navigate to="/recipe" replace />} />
      <Route path="/recipe" element={<RootLayout />} />
      <Route path="newrecipe" element={<CreateRecipe />} />
      <Route path="/editrecipe/:id" element={<CreateRecipe />} />
      <Route path="/recipe" element={<RootLayout />} />
      <Route path="newrecipe" element={<CreateRecipe />} />
      <Route path="/editrecipe/:id" element={<CreateRecipe />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<LogoutInfoPage />} />
      <Route path="/user-profile/:username" element={<UserProfile />} />
      <Route path="viewrecipe/:id" element={<RecipeShow />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/favorite" element={<FavoriteRecipesPage />} />
      <Route path="/" element={<SearchRecipe />} />
      <Route path="/chat" element={<Chat />}></Route>
      <Route path='myrecipe' element={<MyRecipe />}> </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;