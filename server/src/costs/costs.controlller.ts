import { Controller, Delete, Get, Patch, Body, Post, HttpCode, HttpStatus, Req, Res, UseGuards, Param } from "@nestjs/common";
import { CostsService } from "./costs.service";
import { Cost } from "src/schemas/costs.schema";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { AuthService } from "src/auth/auth.service";
import { CreateCostDto } from "./dto/create-cost.dto";
import { UpdateCostDto } from "./dto/update-cost.dto";

@Controller('costs')
export class CostsController {
    constructor(
        private readonly costsService: CostsService,
        private readonly authService: AuthService
    ) { }


    @UseGuards(JwtGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(@Req() req, @Res() res) {
        const token = req.token
        const user = await this.authService.getUserByTokenData(token)
        const costs = await this.costsService.findAll()

        const filteredCosts = costs.filter((cost) => cost.userId === user._id)

        return res.send(filteredCosts)

    }

    @UseGuards(JwtGuard)
    @Post('')
    @HttpCode(HttpStatus.OK)
    async CreateCost(@Body() createCostDto: CreateCostDto,
        @Req() req) {

        const user = this.authService.getUserByTokenData(req.token);

        return await this.costsService.create({
            ...createCostDto,
            userId: (await user)._id as string
        })

    }


    @UseGuards(JwtGuard)
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async updateCost(@Body() updateCostDto: UpdateCostDto,
        @Param('id') id: string) {
        return await this.costsService.update(updateCostDto, id)

    }


    @UseGuards(JwtGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteCost(@Param('id') id: string) {
        return await this.costsService.delete(id)

    }

}