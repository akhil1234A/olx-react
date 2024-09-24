import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { FirebaseContext } from '../Context/Context';

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(FirebaseContext);

  return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
