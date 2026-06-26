import  sequelize from '../../config/db.postgres.js';

// ── import all models (
import User from './User.js';

// ── associations (define when you add related models)

// ── sync 
export const syncDB = async (): Promise<void> => {
  await sequelize.sync({ alter: true });
  console.log('Tables synced');
};

export { sequelize, User };