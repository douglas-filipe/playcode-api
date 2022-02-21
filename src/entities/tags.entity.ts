import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity('tags')
export class Tags {
    
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    name!: string

    constructor() {
        if (!this.id) {
          this.id = uuidv4();
        }
    }
}