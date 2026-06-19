import User from '../../models/pg/User.js';
import appError from '../../utils/appError.js';
import httpStatus from '../../types/httpStatus.js';
// types
interface RegisterInput {
  name: string;
  email: string;
  password: string;
}



const register = async (input: RegisterInput) => {
  const { name, email, password } = input;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new appError(400 , 'User with this email already exists' , httpStatus.BAD_REQUEST);
  }
  await User.create({ name, email, passwordHash: password });
};

export default { register };