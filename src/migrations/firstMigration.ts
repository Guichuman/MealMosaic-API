import sequelize from '../database/database';
import User from '../model/Users';

async function runMigration() {
  try {
    await sequelize.sync({ force: true });
    console.log('Migration successful!');
  } catch (error) {
    console.error('Error running migration:', error);
  } finally {
    await sequelize.close();
  }
}

runMigration();
