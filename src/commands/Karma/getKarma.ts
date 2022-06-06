import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';
import { ApplicationCommandType } from 'discord-api-types/v10';
import { Karma } from '../../lib/models/Karma';

@ApplyOptions<CommandOptions>({
	name: 'getkarma'
})
export class PingCommand extends Command {
	public async contextMenuRun(interaction: Command.ContextMenuInteraction) {
		const user = interaction.options.getUser('user', true);

		const userKarma = (await Karma.findOne({ where: { user_id: user.id } })) || { karma: 0 };

		// @ts-expect-error
		await interaction.reply({ content: `${user.toString()} has ${userKarma.karma} karma.`, ephemeral: true });
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerContextMenuCommand((builder) =>
			builder //
				.setName('Get Karma')
				.setType(ApplicationCommandType.User)
		);
	}
}
