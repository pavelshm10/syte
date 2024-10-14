import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { Catalog } from './schemas/catalog.schema';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@Controller('catalogs')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  async getCatalogs(): Promise<Catalog[]> {
    return this.catalogService.getCatalogs();
  }

  @Put(':id')
  async updateCatalog(
    @Param('id') id: string,
    @Body() updateCatalogDto: UpdateCatalogDto,
  ) {
    return this.catalogService.updateCatalog(id, updateCatalogDto);
  }

  @Post()
  async create(@Body() createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    return this.catalogService.createCatalog(createCatalogDto);
  }
  //   @Delete(':id')
  //   delete(@Param('id') id: string) {
  //     return this.catalogService.delete(id);
  //   }
}
