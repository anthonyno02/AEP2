import { UsersService } from './users.service';
import { UsersDTO } from './DTO/users.dto';
import { User } from './user.entity';
import { PostsDTO } from 'src/posts/DTO/posts.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        users: User[];
    }>;
    createRegistrationForm(): {};
    create(usersDTO: UsersDTO): Promise<void>;
    createLoginForm(): {};
    login(body: {
        email: string;
        senha: string;
    }, session: any): Promise<void>;
    showPostagem(session: any): Promise<{
        posts: import("../posts/posts.entity").Posts[];
    }>;
    createPost(postsDTO: PostsDTO, session: any): Promise<void>;
    edit(id: number): Promise<{
        user: User;
    }>;
    deletePost(id: number): Promise<void>;
}
