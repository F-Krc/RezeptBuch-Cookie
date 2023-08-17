import { validateToken } from '../lib/auth.js';

export const authMiddleware = async (req, res, next) => {
  //const headers = req.headers;
 // console.log(headers)
  const authorization = req.cookies.accessToken;
  //console.log(req.cookies.accessToken);

  if (!authorization) {
    console.log('No authorization header');
    return res.status(403).json({ msg: 'Authentication failed!' });
  }

  try {
    const token = authorization
    //console.log('token',token);
    if (!token) {
      console.log('No valid token');
      return res.status(403).json({ msg: 'Authentication failed!, no valid token' });
    }
    const decodedToken = await validateToken(token);

    if (!decodedToken) {
      console.log('Invalid token');
      return res.status(403).json({ msg: 'Authentication failed!, invalid token' });
    }

    next();
  } catch (error) {
    console.log('Token validation error:', error);
    return res.status(401).json({ msg: 'Authentication failed!' });
  }
};
