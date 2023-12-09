import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from  'react-router-dom';
import './App.css';
import {Home} from './components/Home'
import {Recipe} from './components/Recipe'
import { RootLayout } from './components/RootLayout';
import "bootstrap/dist/css/bootstrap.min.css"
import { Signup } from './components/Auth/Signup';
import { Login } from './components/Auth/Login';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout/>}>
    <Route index element={<Recipe />} />
    <Route path="/allrecipe" element={<Recipe/>}>
      <Route index element={<Recipe/>} />
      <Route path=":id" element={<div>Specific Recipe</div>} />
    </Route>
    <Route path="/favourite-recipe" element={<div>Favourite Recipe</div>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
  </Route>
));


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
