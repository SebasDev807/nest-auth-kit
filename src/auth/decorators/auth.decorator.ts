import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/*
    Custom decorator to apply the AuthGuard using JWT strategy.
    Usage:
    @Auth()     
    protectedRoute() {}
*/
export function Auth() {
    return applyDecorators(
        UseGuards(AuthGuard('jwt'))
    );
}