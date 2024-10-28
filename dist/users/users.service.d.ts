import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersDTO } from './DTO/users.dto';
import { Posts } from '../posts/posts.entity';
import { PostsDTO } from 'src/posts/DTO/posts.dto';
export declare class UsersService {
    private usersRepository;
    private readonly postsRepository;
    constructor(usersRepository: Repository<User>, postsRepository: Repository<Posts>);
    create(usersDTO: UsersDTO): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, usersDTO: UsersDTO): Promise<User>;
    delete(id: number): Promise<boolean>;
    validateUser(email: string, senha: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | undefined>;
    findUserPosts(userId: number): Promise<Posts[]>;
    createPost(postsDTO: PostsDTO): Promise<Posts>;
    getPostsByUserId(userId: number): Promise<Posts[]>;
}
