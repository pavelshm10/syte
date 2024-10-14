// dto/update-catalog.dto.ts
import { IsString, IsBoolean, IsArray, IsIn, IsOptional } from 'class-validator';

export class UpdateCatalogDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @IsIn(['fashion', 'home', 'general'])
  vertical: string;

  @IsBoolean()
  @IsOptional()
  primary: boolean;

  @IsArray()
  @IsOptional()
  locales: string[];
}
