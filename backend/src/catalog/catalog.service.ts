import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog } from './schemas/catalog.schema';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog.name) private catalogModel: Model<Catalog>,
  ) {}

  async getCatalogs(): Promise<Catalog[]> {
    return this.catalogModel.find().exec();
  }

  async updateCatalog(
    id: string,
    updateCatalogDto: UpdateCatalogDto,
  ): Promise<Catalog> {
    const updatedCatalog = await this.catalogModel.findByIdAndUpdate(
      id,
      {
        ...updateCatalogDto,
        indexedAt: new Date(),
      },
      { new: true },
    );

    if (!updatedCatalog) {
      throw new NotFoundException(`Catalog with ID ${id} not found`);
    }

    return updatedCatalog;
  }

  async createCatalog(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    const newCatalog = new this.catalogModel({
      ...createCatalogDto,
      indexedAt: new Date(),
    });
    return newCatalog.save();
  }

  async deleteCatalog(id: string): Promise<boolean> {
    const result = await this.catalogModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
