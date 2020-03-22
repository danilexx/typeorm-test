import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    length: 100,
  })
  title: string;

  @Column("varchar", {
    length: 355,
  })
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
