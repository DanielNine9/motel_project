import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  @IsOptional()
  imageURL?: string;
}

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ResponseAuth {
  id: number;
  firstName: string;
  username: string;
  lastName: string;
  email: string;
  address: string;

  @Exclude()
  password: string;
  role: string;

  @Exclude()
  refreshToken: string;

  @Exclude()
  banned: boolean;

  @Exclude()
  hostId?: number;

  contact: string;
  imageURL: string;
  created_at: Date;

  @Exclude()
  updated_at: Date;

  accessToken: string;

  constructor(partial: Partial<ResponseAuth>) {
    Object.assign(this, partial);
  }
}
