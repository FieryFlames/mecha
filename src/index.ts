import './lib/setup';
import { LogLevel, SapphireClient } from '@sapphire/framework';

const client = new SapphireClient({
	logger: {
		level: process.env.NODE_ENV === 'development' ? LogLevel.Debug : LogLevel.Info
	},
	shards: 'auto',
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_BANS',
		'GUILD_EMOJIS_AND_STICKERS',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS'
	],
	presence: {
		status: 'online',
		activities: [{ name: 'Fortnite', type: 0 }]
	}
});

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login();
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();
