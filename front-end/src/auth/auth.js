import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';

const getTokenType = () => {
    const token = Cookies.get('token');
    if (!token) {
      console.log('No token');
      return null;
    }

    try {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.user.userType, 'userType');
      return decodedToken.user.userType;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  export default getTokenType