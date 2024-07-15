import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from 'src/auth/session.guard';
import { UsersService } from './users.service';
import { AuthDto } from 'src/dto/auth.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(SessionGuard)
  @Post('')
  async createUser(@Req() req, @Body() body) {
    const { firstName, lastName } = body;

    const user: AuthDto = {
      uid: req.auth?.uid,
      firstName,
      lastName,
      email: req.auth?.email,
      picture: req.auth?.email,
    };
    return await this.usersService.createUser(user);
  }

  @UseGuards(SessionGuard)
  @Put()
  async upsertUser(@Req() req) {
    const [firstName, lastName] = req.auth?.name
      ? req.auth?.name?.split(' ')
      : [null, null];
    const user: AuthDto = {
      uid: req.auth?.uid,
      firstName,
      lastName,
      email: req.auth?.email,
      picture: req.auth?.picture,
    };

    return this.usersService.upsertUser(user);
  }

  @UseGuards(SessionGuard)
  @Get('me')
  async getUser(@Req() req) {
    return await this.usersService.getUser(req.auth.uid);
  }

  @Get('clear')
  async clearUsers() {
    await this.usersService.clearUsers();
    return { msg: 'cleared User database' };
  }
}
