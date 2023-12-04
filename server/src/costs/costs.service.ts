import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cost, CostsDocument } from "src/schemas/costs.schema";
import { CreateCostDto } from "./dto/create-cost.dto";
import { UpdateCostDto } from "./dto/update-cost.dto";



@Injectable()
export class CostsService {

    constructor(@InjectModel(Cost.name)
    private costsModel: Model<CostsDocument>) { }

    async findAll(): Promise<Cost[]> {
        return this.costsModel.find()
    }

    async findOne(_id: string): Promise<Cost> {
        return this.costsModel.findOne({ _id })
    }
    async create(createCostDto: CreateCostDto): Promise<Cost> {
        const createdCost = new this.costsModel(createCostDto)
        return createdCost.save()
    }



    async update(updateCostDto: UpdateCostDto, _id: string): Promise<Cost> {
        await this.costsModel.updateOne({
            _id
        }, {
            $set: {
                ...updateCostDto
            }
        })
        return this.findOne(_id)
    }

    async delete(_id: string): Promise<void> {
        await this.costsModel.deleteOne({ _id })
    }

}
