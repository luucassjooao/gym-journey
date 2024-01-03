import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { UserRepository } from 'src/shared/database/repositories/users.repositories';
import Crypts from 'src/shared/providers/Crypts';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(singInDto: SignInDto) {
    const { email, password } = singInDto;

    const emailIsTaken = await this.usersRepo.findUnique({
      where: { email: email },
    });
    if (!emailIsTaken) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    const isPasswordValid = await Crypts.matchPassword(
      password,
      emailIsTaken.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    const accessToken = await this.generateAccessToken(emailIsTaken.id);

    return { accessToken };
  }

  async signup(signUpDto: SignUpDto) {
    const emailIsTaken = await this.usersRepo.findUnique({
      where: {
        email: signUpDto.email,
      },
    });

    if (emailIsTaken) {
      throw new ConflictException('This is email already in use!');
    }

    const hashedPasword = await Crypts.hash(signUpDto.password);

    const user = await this.usersRepo.create({
      data: {
        ...signUpDto,
        password: hashedPasword,
      },
    });

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
