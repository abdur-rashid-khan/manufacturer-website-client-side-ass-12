import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import useAdmin from '../../Hook/useAdmin';
import Loading from '../../Shear/Loading/Loading';

const AdminChecking = ({children}) => {
   const [user,loading] = useAuthState(auth);
   const [admin , adminLoading] = useAdmin(user);

   const location = useLocation();
   if(loading || adminLoading){
      return <Loading></Loading>;
   }
   if(!user || !admin){
       signOut(auth);
       Swal.fire('Login again','' , 'info');
       localStorage.removeItem('token')
      return <Navigate to="/login" state={{ from: location }} replace />
      
   }
   return children;
};
export default AdminChecking;