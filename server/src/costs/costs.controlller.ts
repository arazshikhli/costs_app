import { Controller, Get, HttpCode, HttpStatus, Req, Res, UseGuards } from "@nestjs/common";
import { CostsService } from "./costs.service";
import { Cost } from "src/schemas/costs.schema";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { AuthService } from "src/auth/auth.service";

@Controller('costs')
export class CostsController {
    constructor(
        private readonly costsService: CostsService,
        private readonly authService: AuthService
    ) { }


    @UseGuards(JwtGuard)
    @Get('')
    @HttpCode(HttpStatus.OK)
    async getAll(@Req() req, @Res() res) {
        const token = req.token
        const user = await this.authService.getUserByTokenData(token)
        const costs = await this.costsService.findAll()

        const filteredCosts = costs.filter((cost) => cost.userId === user._id)

        return res.send(filteredCosts)

    }

}