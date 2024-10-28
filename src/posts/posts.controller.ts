// src/posts/posts.controller.ts

import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException, Render, Redirect } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsDTO } from './DTO/posts.dto';
import { Posts } from './posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @Render('posts') // Renderiza o arquivo EJS chamado posts.ejs
  async findAll() {
    const posts = await this.postsService.findAll();
    return { posts }; // Passa os posts para a view
  }

  @Get('cadastro/:id') // Rota para edição
  @Render('cadastro') // Nome do arquivo EJS que será renderizado para edição (ex. cadastro.ejs)
  async edit(@Param('id') id: number) {
    console.log(`Editando post com ID: ${id}`); // Para depuração
    const posts = await this.postsService.findOne(id);
    if (!posts) {
      throw new NotFoundException(`Post com ID ${id} não encontrado`);
    }
    return { posts }; // Passa o post para a view de edição
  }

  @Post()
  @Redirect('/posts') // Redireciona para a lista de posts após a criação
  async create(@Body() postsDTO: PostsDTO) {
    await this.postsService.create(postsDTO);
  }

  @Put(':id')
  @Redirect('/posts') // Redireciona para a lista de posts após a atualização
  async update(
    @Param('id') id: number,
    @Body() postsDTO: PostsDTO,
  ) {
    const posts = await this.postsService.update(id, postsDTO);
    if (!posts) {
      throw new NotFoundException(`Post com ID ${id} não encontrado`);
    }
  }

  @Delete(':id')
  @Redirect('/posts') // Redireciona para a lista de posts após a exclusão
  async delete(@Param('id') id: number) {
    const result = await this.postsService.delete(id);
    if (!result) {
      throw new NotFoundException(`Post com ID ${id} não encontrado`);
    }
  }
}
