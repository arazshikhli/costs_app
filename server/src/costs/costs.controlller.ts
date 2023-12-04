import { Controller, Get, HttpCode, HttpStatus,Req,Res } from "@nestjs/common";
import { CostsService } from "./costs.service";
import { Cost } from "src/schemas/costs.schema";

@Controller('costs')
export class CostsController{
   constructor(
    private costsService:CostsService
   ){}


    @Get('')
    @HttpCode(HttpStatus.OK)
  async getAll(@Req() req,@Res() res):Promise<Cost[]>{
        return this.costsService.findAll()
    }

}