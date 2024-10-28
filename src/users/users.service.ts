// src/users/users.service.ts

import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersDTO } from './DTO/users.dto';
import { Posts } from '../posts/posts.entity';
import { PostsDTO } from 'src/posts/DTO/posts.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Posts) // Supondo que você tenha uma entidade chamada Post
    private readonly postsRepository: Repository<Posts>,
  ) {}

  // Método para criar um novo usuário
  async create(usersDTO: UsersDTO): Promise<User> {
    const user = this.usersRepository.create(usersDTO);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, usersDTO: UsersDTO): Promise<User> {
    await this.usersRepository.update(id, usersDTO);
    return this.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.postsRepository.delete(id);
    return result.affected > 0;
  }

  async validateUser(email: string, senha: string): Promise<User | null> {
    // Verifica se o usuário existe pelo e-mail
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      // Aqui você deve comparar a senha armazenada (usando hashing, se for o caso)
      if (user.senha === senha) {
        return user; // Retorna o usuário se a senha estiver correta
      }
    }
    return null; // Retorna null se o usuário não existir ou a senha estiver incorreta
  }

  // Método para buscar um usuário pelo email
  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // src/users/users.service.ts
async findUserPosts(userId: number): Promise<Posts[]> {
  return this.postsRepository.find({ where: { user: { id: userId } } });
}

// Método para criar uma nova postagem associada a um usuário
async createPost(postsDTO: PostsDTO): Promise<Posts> {
    const post = this.postsRepository.create(postsDTO);
    return this.postsRepository.save(post);
}

async getPostsByUserId(userId: number): Promise<Posts[]> {
  return await this.postsRepository.find({ where: { userId } } as any); // Use 'as any' como uma solução rápida

}

}

