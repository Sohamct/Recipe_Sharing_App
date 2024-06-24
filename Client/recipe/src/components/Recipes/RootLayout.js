import React, {useEffect} from 'react';
import { Navigation } from '../Navigation';
import '../../components/style.css'
import { RecipeList } from './RecipeList/RecipeList';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../features/context';

export const RootLayout = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const {user} = useUser();

  useEffect(() => {
    if(!user){
      navigate('/login');
    }
  }, [user, location.pathname, navigate])
  return (
    <div>
      <Navigation />
      <div className='content-padding'>
      <RecipeList/>
      </div>
    </div>
  );
};
