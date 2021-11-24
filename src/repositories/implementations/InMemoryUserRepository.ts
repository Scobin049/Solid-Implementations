import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class InMemoryUserRepository implements IUsersRepository {
  private usersList: User[] = []

  async findUserByEmail(email: string): Promise<User> {
    const user = this.usersList.find(user => user.email === email)
    return user
  }
  
  async save(user: User): Promise<void> {
    this.usersList.push(user)
  }
}