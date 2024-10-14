// src/catalogs/dto/create-catalog.dto.ts

import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCatalogDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(['fashion', 'home', 'general'])
  vertical: 'fashion' | 'home' | 'general';

  @IsBoolean()
  primary: boolean;

  @IsArray()
  locales: string[];
}
