import { Body, Controller, Post, HttpCode, HttpStatus, Get, Request, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { Public } from "./strategies/public-strategy";


@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signIn(@Body() signInDto: Record<string, any>) {
    console.log(signInDto)
    return await this.authService.signIn(signInDto.login, signInDto.password);
  }



  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("signup")
  async signUp(@Body() signUpDto: Record<string, any>) {

    const payload = {
      login: signUpDto.login,
      email: signUpDto.email,
      password: signUpDto.password,
      createdAt: new Date()
    }
    return await this.authService.signUp(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Get("getme")
  async getMe(@Request() req: Record<string, any>) {
    const { _id, login } = req.user
    console.log(req.user)
    return await this.userService.findOneBy(login);

  }

  @HttpCode(HttpStatus.OK)
  @Get("logout")
  async logout(@Req() req: Record<string, any>): Promise<{ message: string }> {
    const [_type, token] = req.headers.authorization.split(' ')
    console.log({ req: req.user })


    return await this.authService.logOut(req.user.sub)
  }
}
