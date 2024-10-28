// src/users/users.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Posts } from '../posts/posts.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Posts, (post) => post.user)
    posts: Posts[]; // Definição da relação
}
