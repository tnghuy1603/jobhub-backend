import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }
    async validate(payload: any){
        const now = Math.floor(Date.now() / 1000);
        console.log(`Now: ${now} Exp: ${payload.exp}`);
        
        if(payload.exp && payload.exp < now){
            throw new UnauthorizedException("Token has expired");
        }
        return {email: payload.sub, roles: payload.role}
    }
}