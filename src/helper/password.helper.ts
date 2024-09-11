import * as bcrypt from 'bcrypt'
export class PasswordHelper{
    static async hashPwd(rawPwd: string): Promise<string>{
        const salt = await bcrypt.genSalt(16);
        return await bcrypt.hash(rawPwd, salt);
    }
}