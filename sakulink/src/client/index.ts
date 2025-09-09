import { Client, Collection } from "discord.js";
import { Manager, Player, type Payload, type WebSocketClosedEvent } from "sakulink";
import { nodes, token } from "../config";
import { Logger } from "../logger";
import { join } from "path";
import { readdirSync } from "fs";

export class SakulinkClient extends Client {
	public readonly commands = new Collection<string, ICommand>();
	public readonly manager = new Manager({
		nodes: nodes,
		defaultSearchPlatform: "youtube music",
		send: (guild: string, payload: Payload) => this.guilds.cache.get(guild)!.shard.send(payload),
	});

	public constructor() {
		super({
			intents: 129,
		});
	}

	private loadEvents(): void {
		readdirSync(join(__dirname, "..", "events")).map(async (file: string) => {
			if (file.includes(".d.ts") || file.includes(".js.map")) return;
			let { event } = await import(join(__dirname, "..", "events", file));

			Logger.debug(`Event Load ${event.name}`);
			this.on(event.name, event.run.bind(null, this));

			delete require.cache[require.resolve(join(__dirname, "..", "events", file))];
		});
	}

	private loadPlayers(): void {
		readdirSync(join(__dirname, "..", "players")).map(async (file: string) => {
			if (file.includes(".d.ts") || file.includes(".js.map")) return;
			let { event } = await import(join(__dirname, "..", "players", file));

			Logger.debug(`Player Event Load ${event.name}`);
			this.manager.on(event.name, (player: Player, payload: WebSocketClosedEvent) => event.run(player, payload));

			delete require.cache[require.resolve(join(__dirname, "..", "players", file))];
		});
	}

	private loadCommands(): void {
		const commands: ICommand[] = [];

		readdirSync(join(__dirname, "..", "commands")).map(async (directory: string) => {
			let files: string[] = readdirSync(join(__dirname, "..", "commands", directory)).filter((file: string) => file.endsWith(".ts") || file.endsWith(".js"));

			for (let file of files) {
				let command = (await import(join(__dirname, "..", "commands", directory, file)))?.default as ICommand;

				this.commands.set(command.name, command);
				commands.push(command);
				Logger.debug(`Command Load: ${command.name}`);

				delete require.cache[require.resolve(join(__dirname, "..", "commands", directory, file))];
			}

			this.on("ready", async () => {
				this.application?.commands.set(commands);
				this.manager.init(this.user?.id);
			});
		});
	}

	private antiCrash() {
		process.on("unhandledRejection", (reason, promise) => {
			Logger.warn(reason, promise);
		});

		process.on("uncaughtException", (err) => {
			Logger.warn(err);
		});
	}

	public init(t?: string) {
		this.login(t ?? token);
		this.loadEvents();
		this.loadCommands();
		this.loadPlayers();
		this.antiCrash();
	}
}