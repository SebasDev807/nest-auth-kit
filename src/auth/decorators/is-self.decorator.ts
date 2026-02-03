import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { IsSelfGuard } from "../guards/is-self.guard";

/*
    Custom decorator to apply both AuthGuard and IsSelfGuard.
    Usage:
    @IsSelf()
    protectedRoute() {}
*/
export function IsSelf() {
    return applyDecorators(
        UseGuards(AuthGuard(), IsSelfGuard)
    );
}