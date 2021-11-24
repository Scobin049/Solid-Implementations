import { MailtrapProvider } from "../../providers/implementations/MailtrapProvider";
import { InMemoryUserRepository } from "../../repositories/implementations/InMemoryUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapProvider = new MailtrapProvider()
const inMemoryUserRepository = new InMemoryUserRepository()

const createUserUseCase = new CreateUserUseCase(
  inMemoryUserRepository,
  mailtrapProvider
)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, createUserController }