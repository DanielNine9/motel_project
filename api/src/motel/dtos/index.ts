import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateMotelDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nation: string;

  @IsString()
  @IsNotEmpty()
  local: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsString()
  @IsNotEmpty()
  amenities: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  discount: number;
}

class ImageDTO {
  @IsString()
  fileName: string;

  @IsNumber()
  @IsOptional()
  id: number | null;
}

export class UpdateMotelDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nation: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  local: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  desc: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  //   @IsArray()
  //   @IsOptional()
  //   @ValidateNested({ each: true })
  //   @Type(() => ImageDTO)
  //   images?: ImageDTO[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  images?: string[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  amenities: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  discount: number;
}

export class ResponseMotel {
  constructor(
    private readonly responseData,
    private readonly totalItems,
    private readonly totalPages,
  ) {}
}
