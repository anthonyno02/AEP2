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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const posts_entity_1 = require("../posts/posts.entity");
let UsersService = class UsersService {
    constructor(usersRepository, postsRepository) {
        this.usersRepository = usersRepository;
        this.postsRepository = postsRepository;
    }
    async create(usersDTO) {
        const user = this.usersRepository.create(usersDTO);
        return this.usersRepository.save(user);
    }
    async findAll() {
        return this.usersRepository.find();
    }
    async findOne(id) {
        return this.usersRepository.findOneBy({ id });
    }
    async update(id, usersDTO) {
        await this.usersRepository.update(id, usersDTO);
        return this.findOne(id);
    }
    async delete(id) {
        const result = await this.postsRepository.delete(id);
        return result.affected > 0;
    }
    async validateUser(email, senha) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (user) {
            if (user.senha === senha) {
                return user;
            }
        }
        return null;
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({ where: { email } });
    }
    async findUserPosts(userId) {
        return this.postsRepository.find({ where: { user: { id: userId } } });
    }
    async createPost(postsDTO) {
        const post = this.postsRepository.create(postsDTO);
        return this.postsRepository.save(post);
    }
    async getPostsByUserId(userId) {
        return await this.postsRepository.find({ where: { userId } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(posts_entity_1.Posts)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map