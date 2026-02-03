import { createParamDecorator, ExecutionContext, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";

/*
    Custom decorator to extract the user from the request object.
    Usage:
    @GetUser() user: User
    @GetUser('email') email: string 
*/
export const GetUser = createParamDecorator(
  
    ( data: string, context: ExecutionContext) => {

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("User not authenticated");
    }

    return (!data)
        ? user
        : user[data];
   }
)