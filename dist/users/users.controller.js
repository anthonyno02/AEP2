"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_dto_1 = require("./DTO/users.dto");
const posts_dto_1 = require("../posts/DTO/posts.dto");
var usuarioId;
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll() {
        const users = await this.usersService.findAll();
        return { users };
    }
    createRegistrationForm() {
        return {};
    }
    async create(usersDTO) {
        await this.usersService.create(usersDTO);
    }
    createLoginForm() {
        return {};
    }
    async login(body, session) {
        const { email, senha } = body;
        const user = await this.usersService.validateUser(email, senha);
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        session.userId = user.id;
        console.log('Usuario: ' + session.userId);
        usuarioId = session.userId;
        return;
    }
    async showPostagem(session) {
        if (!session.userId) {
            throw new common_1.NotFoundException('Usuário não autenticado');
        }
        const posts = await this.usersService.getPostsByUserId(session.userId);
        return { posts };
    }
    async createPost(postsDTO, session) {
        console.log(usuarioId);
        if (!usuarioId) {
            throw new common_1.UnauthorizedException('Usuário não autenticado');
        }
        console.log('Post DTO:', postsDTO);
        postsDTO.userId = usuarioId;
        await this.usersService.createPost(postsDTO);
    }
    async edit(id) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return { user };
    }
    async deletePost(id) {
        console.log(`Tentando excluir a postagem com ID: ${id}`);
        const result = await this.usersService.delete(id);
        if (!result) {
            console.log(`Postagem com ID: ${id} não encontrada`);
            throw new common_1.NotFoundException(`Postagem com ID ${id} não encontrada`);
        }
        console.log(`Postagem com ID: ${id} excluída com sucesso`);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('cadastro'),
    (0, common_1.Render)('cadastro'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createRegistrationForm", null);
__decorate([
    (0, common_1.Post)('save'),
    (0, common_1.Redirect)('/users'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UsersDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('login'),
    (0, common_1.Render)('login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createLoginForm", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.Redirect)('/users/postagem', 302),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('postagem'),
    (0, common_1.Render)('postagem'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "showPostagem", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.Redirect)('/users/postagem', 302),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.PostsDTO, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)('cadastro/:id'),
    (0, common_1.Render)('cadastro'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "edit", null);
__decorate([
    (0, common_1.Get)('/postagem/:id'),
    (0, common_1.Delete)('/postagem/:id'),
    (0, common_1.Redirect)('/users/postagem'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deletePost", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map