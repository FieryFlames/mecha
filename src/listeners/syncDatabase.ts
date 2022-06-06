import { Listener } from '@sapphire/framework';
import type { Client } from 'discord.js';
import { sequelize } from '../lib/db';

export class SyncDatabaseListener extends Listener {
	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, {
			...options,
			once: true,
			event: 'ready'
		});
	}

	public async run(_: Client) {
		await sequelize.sync();
		this.container.logger.info('Synced models');
	}
}
