import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import { compare, hash } from 'bcrypt';

import { User } from './interfaces/user.interface';
import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  async getAll() {
    try {
      const users = await this.db.users.find();

      const usersToResponse = users.map((user) => {
        const userToResponse = this.toRequest(user);

        return userToResponse;
      });

      return usersToResponse;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string, isPasswordIncluded = false) {
    try {
      if (!uuidValidate(id)) {
        throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
      }

      const user = await this.db.users.findOne({ where: { id } });

      if (!user) {
        throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
      }

      if (!isPasswordIncluded) {
        const userToResponse = this.toRequest(user);

        return userToResponse;
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const userId = uuidv4();
      const dateNow = Date.now();
      const { password, login } = createUserDto;

      const hashedPassword = await hash(
        password,
        parseInt(process.env.CRYPT_SALT),
      );

      const user = {
        id: userId,
        version: 1,
        createdAt: dateNow,
        updatedAt: dateNow,
        password: hashedPassword,
        login,
      };
      await this.db.users.save(user);

      const userToResponse = this.toRequest(user);

      return userToResponse;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { oldPassword, newPassword } = updateUserDto;
      const user = await this.getById(id, true);

      const isPasswordCorrect = await compare(oldPassword, user.password);

      if (!isPasswordCorrect) {
        throw new HttpException('Password is incorrect', HttpStatus.FORBIDDEN);
      }
      const dateNow = Date.now();

      user.version += 1;
      user.updatedAt = dateNow;
      user.password = await hash(newPassword, parseInt(process.env.CRYPT_SALT));

      await this.db.users.save(user);

      const userToResponse = this.toRequest(user);

      return userToResponse;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.getById(id);
      const deletionResult = await this.db.users.delete(id);

      if (deletionResult) {
        return null;
      } else {
        throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }

  toRequest(user: User) {
    const userToResponse = { ...user };
    delete userToResponse.password;
    userToResponse.createdAt = Number(userToResponse.createdAt);
    userToResponse.updatedAt = Number(userToResponse.updatedAt);

    return userToResponse;
  }
}
