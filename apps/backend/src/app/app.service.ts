import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly users = [
    {
      id: '123456',
      fullname: 'John Wick',
      username: 'JohnWick',
      wallet: 1000,
    }, {
      id: '789456',
      fullname: 'Thomas A. Anderson',
      username: 'Neo',
      wallet: 1000,
    }
  ]
  getUsers() {
    return this.users;
  }

  getUser(userId: string) {
    const users = this.getUsers();
    return users.find((user) => user.id === userId);
  }
}
