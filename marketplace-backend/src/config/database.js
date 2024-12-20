import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sellam9ja_db', 'sellam9ja_db', 'sellam9ja123', {
  host: 'localhost',
  dialect: 'postgres', 
});

export default sequelize;
