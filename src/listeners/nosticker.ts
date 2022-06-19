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
					await message.delete();
					this.container.logger.debug(`NoStickerListener: Deleted message ${message.id}.`);
				} else {
					this.container.logger.debug(`NoStickerListener: Message ${message.id} is not deletable.`);
				}
			}
		}
	}
}
