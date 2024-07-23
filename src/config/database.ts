import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('latihanNode', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
