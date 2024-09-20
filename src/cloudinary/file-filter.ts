import { BadRequestException } from "@nestjs/common"

export const pdfFileFilter = (req, file, callback) => {
    if(file.mimetype !== 'application/pdf'){
        callback(new BadRequestException('Only pdf files are allowed'), false)
    }
    callback(null, true)
}