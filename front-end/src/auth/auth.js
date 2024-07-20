import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const getTokenData = () => {
  const token = Cookies.get('token');
  if (!token) {
    console.log('No token');
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken.user, 'tokenData');
    return decodedToken.user;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

  export default getTokenData