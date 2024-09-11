import { CanActivate, ExecutionContext,  } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Jwt } from "jsonwebtoken";

export class JwtAuthGuard extends AuthGuard('jwt'){
    
}