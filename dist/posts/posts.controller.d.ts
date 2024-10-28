import { PostsService } from './posts.service';
import { PostsDTO } from './DTO/posts.dto';
import { Posts } from './posts.entity';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(): Promise<{
        posts: Posts[];
    }>;
    edit(id: number): Promise<{
        posts: Posts;
    }>;
    create(postsDTO: PostsDTO): Promise<void>;
    update(id: number, postsDTO: PostsDTO): Promise<void>;
    delete(id: number): Promise<void>;
}
