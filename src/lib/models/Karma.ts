import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const Karma = sequelize.define('Karma', {
	user_id: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	karma: DataTypes.INTEGER
});
