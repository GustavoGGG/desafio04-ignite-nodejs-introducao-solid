import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
      admin: false,
    });
    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    const userExist = this.users.find((user) => user.id === id);
    return userExist;
  }

  findByEmail(email: string): User | undefined {
    const userExist = this.users.find((user) => user.email === email);
    return userExist;
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );
    const user = { ...this.users[userIndex], ...receivedUser };
    this.users[userIndex] = user;
    this.users[userIndex].admin = true;
    this.users[userIndex].updated_at = new Date();

    return this.users[userIndex];
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
