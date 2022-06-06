import { ApplyOptions } from '@sapphire/decorators';
import { Command, CommandOptions } from '@sapphire/framework';

@ApplyOptions<CommandOptions>({
	name: 'ping',
	description: 'Ping bot to see if it is alive',
	chatInputCommand: {
		register: true
	}
})
export class PingCommand extends Command {
	public async chatInputRun(interaction: Command.ChatInputInteraction) {
		const content = `Pong! Bot Latency ${Math.round(this.container.client.ws.ping)}ms.`;

		interaction.reply({ content: content, ephemeral: true });
	}
}
