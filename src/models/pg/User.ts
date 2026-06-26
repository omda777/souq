import { DataTypes, Model, Optional } from 'sequelize';
import  sequelize  from '../../config/db.postgres.js';
import { UserRole } from '../../types/index.js';

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  verificationToken: string | null;
  resetToken: string | null;
  resetTokenExpiry: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | "id"
    | "role"
    | "isVerified"
    | "isActive"
    | "verificationToken"
    | "resetToken"
    | "resetTokenExpiry"
  > {}

type UserInstance = Model<UserAttributes, UserCreationAttributes> &
  UserAttributes;

const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('buyer', 'seller', 'admin'),
      defaultValue: 'buyer',
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: 'users',
    underscored: true,
    timestamps: true,
  }
);

export default User;