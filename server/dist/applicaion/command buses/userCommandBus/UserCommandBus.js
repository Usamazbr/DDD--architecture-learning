import { ClassNameExtractor, CommandBus, CommandHandlerMiddleware, HandleInflector, InMemoryLocator, LoggerMiddleware } from "simple-command-bus";
import { CreateAccountHandler } from "./handlers/Handler.js";
export class UserCommandBus extends CommandBus {
}
export const userCommandBus = new CommandBus([
    new LoggerMiddleware(console),
    new CommandHandlerMiddleware(new ClassNameExtractor(), new InMemoryLocator({ CreateAccountHandler: new CreateAccountHandler() }), new HandleInflector())
]);
