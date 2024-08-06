import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string): Promise<User> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      return await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw new HttpException(error.response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (user && (await bcrypt.compare(password, user.password))) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      throw new HttpException(error.response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.validateUser(email, password);
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new HttpException(
        error.response || 'Login failed',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
