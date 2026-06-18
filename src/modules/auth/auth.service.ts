import { User } from '../../models/mongo/User.js';

export class AuthService {
  async registerUser(name: string, email: string, password: string) {
    try {
      const newUser = new User({
        name,
        email,
        password, // In production, hash this with bcrypt!
      });

      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw error;
    }
  }
}
