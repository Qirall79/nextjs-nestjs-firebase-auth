import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { FirebaseService } from 'src/auth/firebase.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, FirebaseService],
  controllers: [UsersController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
