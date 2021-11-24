import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import {  ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ){}

  async execute(data: ICreateUserRequestDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findUserByEmail(data.email)

    if(userAlreadyExists){
      throw new Error('User already exists')
    }

    const user = new User(data)
    await this.usersRepository.save(user)
    

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Equipe MyApp",
        email: 'contato@myapp.com',
      },
      subject:'Bem vindo a sua conta',
      body:'<h1>Bem vindo</h1><br/><br/><p>Você já pode utilizar nossa plataforma</p>'
    })

    return user
  }
}