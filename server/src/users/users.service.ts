import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from 'src/dto/auth.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(user: AuthDto): Promise<AuthDto> {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async upsertUser(user: AuthDto): Promise<AuthDto> {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.upsert(newUser, {
      conflictPaths: ['uid'],
      skipUpdateIfNoValuesChanged: true,
    });
    return newUser;
  }

  async getUser(uid: string) {
    const user = await this.usersRepository.findOneBy({
      uid,
    });
    return user;
  }

  async clearUsers() {
    await this.usersRepository.clear();
  }
}
