import { Sequelize } from 'sequelize';
import { container } from '@sapphire/framework';

export const sequelize = new Sequelize(process.env.DATABASE || 'sqlite::memory:', {
	logging: (msg) => container.logger.debug(msg)
});
