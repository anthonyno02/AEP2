import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException, UnauthorizedException, Render, Redirect, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { UsersDTO } from './DTO/users.dto';
import { User } from './user.entity';
import { PostsDTO } from 'src/posts/DTO/posts.dto';

var usuarioId;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Render('users') // Renderiza o arquivo EJS users.ejs
  async findAll() {
    const users = await this.usersService.findAll();
    return { users }; // Passa os usuários para a view
  }

  @Get('cadastro') // Rota para a página de cadastro
  @Render('cadastro') // Renderiza o template cadastro.ejs
  createRegistrationForm() {
    return {}; // Não é necessário passar dados para o template
  }

  @Post('save')
  @Redirect('/users') // Redireciona para a lista de usuários após a criação
  async create(@Body() usersDTO: UsersDTO) {
    await this.usersService.create(usersDTO);
  }

  @Get('login') // Rota para a página de login
  @Render('login') // Renderiza o template login.ejs
  createLoginForm() {
    return {}; // Não é necessário passar dados para o template
  }

  @Post('login')
  @Redirect('/users/postagem', 302) // Adicione aqui o redirecionamento padrão
  async login(@Body() body: { email: string; senha: string }, @Session() session) {
    const { email, senha } = body;
    const user = await this.usersService.validateUser(email, senha);

    if (!user) {
      // Se o usuário não for encontrado, lance uma exceção ou retorne uma mensagem de erro
      throw new NotFoundException('Usuário não encontrado'); // Você pode personalizar essa mensagem
    }

    // Armazena informações da sessão ou token, se necessário
    session.userId = user.id; // Armazene o ID do usuário na sessão
    console.log('Usuario: ' + session.userId);
    usuarioId = session.userId;
    // O redirecionamento já está sendo tratado pela anotação @Redirect
    return; // Retorne um valor vazio
  }

  @Get('postagem') // Rota para acessar a página de postagem
  @Render('postagem') // Renderiza o arquivo postagem.ejs
  async showPostagem(@Session() session) {
    // Verifique se o usuário está autenticado
    if (!session.userId) {
      throw new NotFoundException('Usuário não autenticado');
    }
    
    // Obtém as postagens do usuário
    const posts = await this.usersService.getPostsByUserId(session.userId);

    return { posts }; // Passa as postagens para a view
  }

  @Post('create')
  @Redirect('/users/postagem', 302) // Redireciona após a criação
  async createPost(@Body() postsDTO: PostsDTO, @Session() session) {
    // Verifique se session.userId está definido
    console.log(usuarioId);
    if (!usuarioId) {
        throw new UnauthorizedException('Usuário não autenticado');
    }
    // Preencha o userId diretamente no DTO
    console.log('Post DTO:', postsDTO); // Verifique o conteúdo do DTO antes de passar para o serviço
    postsDTO.userId = usuarioId; // Aqui você atribui o ID do usuário diretamente
    // Crie a postagem usando o serviço
    await this.usersService.createPost(postsDTO);
  }

  @Get('cadastro/:id')
  @Render('cadastro') // Renderiza o template de edição de cadastro
  async edit(@Param('id') id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return { user };
  }

  @Get('/postagem/:id')
  @Delete('/postagem/:id')
  @Redirect('/users/postagem') // Redireciona após a exclusão
  async deletePost(@Param('id') id: number) {
    console.log(`Tentando excluir a postagem com ID: ${id}`);
    const result = await this.usersService.delete(id);
    if (!result) {
        console.log(`Postagem com ID: ${id} não encontrada`);
        throw new NotFoundException(`Postagem com ID ${id} não encontrada`);
    }
    console.log(`Postagem com ID: ${id} excluída com sucesso`);
}
}
