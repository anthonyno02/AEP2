import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // Ajuste para o caminho correto
import { UsersController } from './users.controller'; // Certifique-se de que o caminho está correto
import { UsersService } from './users.service';
import { Posts } from '../posts/posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Posts])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
