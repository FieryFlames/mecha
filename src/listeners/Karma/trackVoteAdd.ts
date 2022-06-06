import { Listener } from '@sapphire/framework';
import type { MessageReaction, User } from 'discord.js';
import { Karma } from '../../lib/models/Karma';

export class trackVoteAddListener extends Listener {
	public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, {
			...options,
			event: 'messageReactionAdd'
		});
	}

	public async run(messageReaction: MessageReaction, _: User) {
		if (messageReaction.message.channel.id != process.env.KARMA_CHANNEL_ID) return;

		if (messageReaction.partial) {
			try {
				await messageReaction.fetch();
			} catch (error) {
				this.container.logger.error(error);
				return;
			}
		}

		// @ts-expect-error
		if (messageReaction.message.author.bot) return;

		if (messageReaction.emoji.toString() == '⬆️') {
			// @ts-expect-error
			let [authorKarma, created] = await Karma.findOrCreate({ where: { user_id: messageReaction.message.author.id }, defaults: { karma: 0 } });

			await authorKarma.increment('karma');
		} else if (messageReaction.emoji.toString() == '⬇️') {
			// @ts-expect-error
			let [authorKarma, created] = await Karma.findOrCreate({ where: { user_id: messageReaction.message.author.id }, defaults: { karma: 0 } });

			await authorKarma.decrement('karma');
		}
	}
}
