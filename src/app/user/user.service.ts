import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import { DbService } from '../../db/db.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  getAll() {
    const users = this.db.users;

    const usersToResponse = users.map((user) => {
      const userToResponse = this.toRequest(user);

      return userToResponse;
    });

    return usersToResponse;
  }

  getById(id: string, isPasswordIncluded = false) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }

    const user = this.db.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
    }

    if (!isPasswordIncluded) {
      const userToResponse = this.toRequest(user);

      return userToResponse;
    }

    return user;
  }

  getIndexById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }

    const userIndex = this.db.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
    }

    return userIndex;
  }

  create(createUserDto: CreateUserDto) {
    const userId = uuidv4();
    const dateNow = Date.now();

    const user = {
      id: userId,
      version: 1,
      createdAt: dateNow,
      updatedAt: dateNow,
      ...createUserDto,
    };
    this.db.users.push(user);

    const userToResponse = this.toRequest(user);

    return userToResponse;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserDto;
    const user = this.getById(id, true);

    if (user.password !== oldPassword) {
      throw new HttpException('Password is incorrect', HttpStatus.FORBIDDEN);
    }
    const dateNow = Date.now();

    user.version += 1;
    user.updatedAt = dateNow;
    user.password = newPassword;

    const userToResponse = this.toRequest(user);

    return userToResponse;
  }

  delete(id: string) {
    const userIndex = this.getIndexById(id);
    this.db.users.splice(userIndex, 1);

    return null;
  }

  toRequest(user: User) {
    const userToResponse = { ...user };
    delete userToResponse.password;

    return userToResponse;
  }
}
