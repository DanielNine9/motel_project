import {
  IsIdentityCard,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class transactionDTO {
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsString()
  @IsPhoneNumber('VN')
  phoneNumber: string;

  @IsNumber()
  @IsPositive()
  duration: number;

  @IsString()
  @IsNotEmpty()
  idCard: string;
}
