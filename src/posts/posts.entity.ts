// src/posts/posts.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';


@Entity('posts')
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: "Titulo" })
    titulo: string;

    @Column({ default: "Descricao" })
    descricao: string;

    @Column({ default: true })
    isActive: boolean;

    @Column() //Este deve ser um campo do tipo que representa o ID do usuário
    userId:{ id: number }; // Aqui está a propriedade que você precisa

    @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
    user: User; // Referência ao usuário

    @Column({ nullable: true })
    imageUrl: string; // Campo para armazenar o caminho da imagem
}
