import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import { User } from './interfaces/user.interface';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    try {
      const users = await this.userRepository.find();

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

      const user = await this.userRepository.findOne({ where: { id } });

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

      const user = {
        id: userId,
        version: 1,
        createdAt: dateNow,
        updatedAt: dateNow,
        ...createUserDto,
      };
      await this.userRepository.save(user);

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

      if (user.password !== oldPassword) {
        throw new HttpException('Password is incorrect', HttpStatus.FORBIDDEN);
      }
      const dateNow = Date.now();

      user.version += 1;
      user.updatedAt = dateNow;
      user.password = newPassword;

      await this.userRepository.save(user);

      const userToResponse = this.toRequest(user);

      return userToResponse;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.getById(id);
      const deletionResult = await this.userRepository.delete(id);

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
