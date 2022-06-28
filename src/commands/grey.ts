import { Command } from '@sapphire/framework';

export class GreyCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			name: 'grey',
			description: 'Turn someone into a grey and vice versa',
			chatInputCommand: {
				register: true
			}
		});
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName('grey')
				.setDescription('Turn someone into a grey and vice versa')
				.addUserOption((option) => option.setName('member').setDescription('Who to grey').setRequired(true))
				.addBooleanOption((option) => option.setName('silent').setDescription('Should the grey notification message be public'))
		);
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction) {
		const target = interaction.guild?.members.cache.find((member) => member.id === interaction.options.getUser('member', true).id);
		const slient = interaction.options.getBoolean('silent') ?? false;
		const grey = interaction.guild?.roles.cache.find((role) => role.name === "I'm new here, say hi!");

		if (!grey) {
			return interaction.reply({ content: 'No grey role..', ephemeral: slient });
		}

		if (!grey?.members.some((member) => member.id === target?.id)) {
			try {
				await target?.roles.add(grey);

				this.container.logger.info(`GreyCommand: Turned ${target?.id} into a grey.`);

				return interaction.reply({ content: `${target} is now a grey <:grey:988241434979225610>`, ephemeral: slient });
			} catch {
				return interaction.reply({ content: 'Something went wrong...', ephemeral: slient });
			}
		} else {
			try {
				await target?.roles.remove(grey);

				this.container.logger.info(`GreyCommand: ${target?.id} is no longer grey.`);

				return interaction.reply({ content: `${target} is no longer a grey <:grey:988241434979225610>`, ephemeral: slient });
			} catch {
				return interaction.reply({ content: 'Something went wrong...', ephemeral: slient });
			}
		}
	}
}
