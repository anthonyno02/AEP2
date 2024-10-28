import { Repository } from 'typeorm';
import { Posts } from './posts.entity';
import { PostsDTO } from './DTO/posts.dto';
export declare class PostsService {
    private postsRepository;
    constructor(postsRepository: Repository<Posts>);
    findAll(): Promise<Posts[]>;
    findOne(id: number): Promise<Posts>;
    create(postsDTO: PostsDTO): Promise<Posts>;
    update(id: number, postsDTO: PostsDTO): Promise<Posts>;
    delete(id: number): Promise<boolean>;
}
