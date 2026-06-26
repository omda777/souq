import User from '../../models/pg/User.js';
import appError from '../../utils/appError.js';
import httpStatus from '../../types/httpStatus.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// types
interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}


// Token helpers
 
const signAccessToken = (userId: string, role: string): string => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES ?? '15m' }
  );
};
 
const signRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES ?? '7d' }
  );
};


const register = async (input: RegisterInput) => {
  const { name, email, password } = input;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new appError(400 , 'User with this email already exists' , httpStatus.BAD_REQUEST);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  // TODO: send verification email

  const user = await User.create({ name, email, passwordHash });

  return {userId: user.id, name: user.name, email: user.email}; ;
};

export const login = async (input: LoginInput) => {
  console.log('Login input:', input); // Debugging line
  const { email, password } = input;
 
  const user = await User.findOne({
    where: { email, isActive: true },
    attributes: [
      'id',
      'name',
      'email',
      'role',
      'passwordHash',
      'isVerified',
    ],
  });
 
  
  if (!user) throw new appError(401 ,'Invalid email or password', httpStatus.UNAUTHORIZED);
 
  if (!user.isVerified)
    throw new appError( 403 ,'Please verify your email before logging in',httpStatus.FORBIDDEN );
 
 
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) throw new appError(401 ,'Invalid email or password', httpStatus.UNAUTHORIZED);

  
  const accessToken = signAccessToken(user.id, user.role);
  const refreshToken = signRefreshToken(user.id);
 
  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export default { register, login };