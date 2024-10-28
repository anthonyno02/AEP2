// src/posts/posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';
import { PostsDTO } from './DTO/posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}

  async findAll(): Promise<Posts[]> {
    return this.postsRepository.find();
  }

  async findOne(id: number): Promise<Posts> {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post com ID ${id} não encontrado`);
    }
    return post;
  }

  async create(postsDTO: PostsDTO): Promise<Posts> {
    const post = this.postsRepository.create(postsDTO);
    return await this.postsRepository.save(post);
  }

  async update(id: number, postsDTO: PostsDTO): Promise<Posts> {
    const post = await this.findOne(id); // Isso já verifica se existe
    Object.assign(post, postsDTO); // Atualiza as propriedades
    return this.postsRepository.save(post); // Salva as alterações
  }


  async delete(id: number): Promise<boolean> {
    const result = await this.postsRepository.delete(id);
    return result.affected > 0;
  }
}
