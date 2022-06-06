import { Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class addVoteReactionsListener extends Listener {
	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, {
			...options,
			event: 'messageCreate'
		});
	}

	public async run(message: Message) {
		if (message.author.bot) return;
		else if (message.channel.id != process.env.KARMA_CHANNEL_ID) return;

		await message.react('⬆️');
		await message.react('⬇️');
	}
}
