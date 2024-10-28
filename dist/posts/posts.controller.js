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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const posts_dto_1 = require("./DTO/posts.dto");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async findAll() {
        const posts = await this.postsService.findAll();
        return { posts };
    }
    async edit(id) {
        console.log(`Editando post com ID: ${id}`);
        const posts = await this.postsService.findOne(id);
        if (!posts) {
            throw new common_1.NotFoundException(`Post com ID ${id} não encontrado`);
        }
        return { posts };
    }
    async create(postsDTO) {
        await this.postsService.create(postsDTO);
    }
    async update(id, postsDTO) {
        const posts = await this.postsService.update(id, postsDTO);
        if (!posts) {
            throw new common_1.NotFoundException(`Post com ID ${id} não encontrado`);
        }
    }
    async delete(id) {
        const result = await this.postsService.delete(id);
        if (!result) {
            throw new common_1.NotFoundException(`Post com ID ${id} não encontrado`);
        }
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('posts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('cadastro/:id'),
    (0, common_1.Render)('cadastro'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "edit", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Redirect)('/posts'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.PostsDTO]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.Redirect)('/posts'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, posts_dto_1.PostsDTO]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.Redirect)('/posts'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "delete", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map