// src/app.module.ts
import { Module } from '@nestjs/common'; // Remover Post
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/category.entity';
import { User } from './users/user.entity';
import { Posts } from './posts/posts.entity'; // Corrigir o caminho se necessário
import { PostsModule } from './posts/posts.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'unicesumar',
      password: 'unicesumar',
      database: 'blog',
      entities: [Category, User, Posts], // Adicione Posts aqui
      synchronize: true,
    }),
    CategoriesModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
