import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Cost, CostSchema } from 'src/schemas/costs.schema';
import { CostsService } from './costs.service';
import { AuthModule } from 'src/auth/auth.module';


@Module({
    imports: [MongooseModule.forFeature([{ name: Cost.name, schema: CostSchema }]),
        AuthModule
    ],
    exports: [CostsService],
    providers: [CostsService]

})
export class CostsModule {


}