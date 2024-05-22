import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm"
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService
  ) { }

  async findOneById(id: number): Promise<Partial<UserEntity>> {
    const user = await this.userRepository.findOneBy({ id });
    return user
  }

  async findOneBy(login: string): Promise<Partial<UserEntity>> {
    const user = await this.userRepository.findOneBy({ login });
    return user
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const SALT_ROUND = Number(this.configService.get<number>("SALT_ROUND", 10))


      const salt = await bcrypt.genSalt(SALT_ROUND);
      const hash = await bcrypt.hash(createUserDto.password, salt)
      createUserDto.password = hash

      const user = this.userRepository.create({
        ...createUserDto,
      })
      const savedUser = await this.userRepository.save(user);
      const { id, createdAt, updatedAt, ...result } = savedUser;

      return result
    } catch (error) {
      console.error(error)
    }
  }
}

