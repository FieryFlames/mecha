import { Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class NoStickerListener extends Listener {
	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, {
			...options,
			event: 'messageCreate'
		});
	}

	public async run(message: Message) {
		if (message.author.bot) return;

		if (message.member?.roles.cache.some((role) => role.name === 'nosticker')) {
			if (message.stickers.first()) {
				if (message.deletable) {
					try {
						await message.delete();
						this.container.logger.info(`NoStickerListener: Deleted message ${message.id}.`);
					} catch (error) {
						this.container.logger.error(`NoStickerListener: ${error} occured when deleting message ${message.id}`);
					}
				} else {
					this.container.logger.warn(`NoStickerListener: Message ${message.id} is not deletable.`);
				}
			}
		}
	}
}
