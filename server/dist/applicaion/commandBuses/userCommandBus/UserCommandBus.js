import { CommandHandlerError } from "../../../framework/errors/errorHandler.js";
export class UserCommandBus {
    handlers = new Map();
    registerHandler(commandName, handler) {
        this.handlers.set(commandName, handler);
    }
    async execute(command) {
        const handler = this.handlers.get(command.constructor.name);
        if (!handler) {
            throw new CommandHandlerError(400, `No handler registered for command ${command.constructor.name}`);
        }
        return await handler.handle(command);
    }
}
