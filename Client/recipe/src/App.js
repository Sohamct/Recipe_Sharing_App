import { ToastContainer, toast } from 'react-toastify';

import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate} from  'react-router-dom';
import './App.css';
import { RootLayout } from './components/RootLayout';
import "bootstrap/dist/css/bootstrap.min.css"
import { Signup } from './components/Auth/Signup';
import { Login } from './components/Auth/Login';
import { Recipes } from './components/Recipes/Recipes';
import { MyRecipe } from './components/MyRecipe/MyRecipe';
import { RecipeShow, loader as RecipeLoader } from './components/Recipes/RecipeList/RecipeItem.js/RecipeShow';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Navigate to="/recipe" replace/>}>
    <Route path ="/recipe" element={<RootLayout />} >
      <Route index element={<Recipes/>} />
      <Route path=":id" element={RecipeShow} loader={RecipeLoader}/>
    </Route>
    <Route path ="/myrecipe" element={<RootLayout />} >
      <Route index element={<MyRecipe/>} />
      <Route path=":id" element={<RecipeShow/>} loader={RecipeLoader}/>
      {/* <Route path=":id/edit" element={<RecipeEdit/>} loader={RecipeLoader}/> */}
    </Route>
    <Route path="/favourite-recipe" element={<div>Favourite Recipe</div>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
  </Route>
));


function App() {
  return (
    <>
    <RouterProvider router={router}/>
    <ToastContainer/>
    </>
  );
}

export default App;
