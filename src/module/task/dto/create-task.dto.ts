import { IsString } from 'class-validator';
import { status } from '@prisma/client';
export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  completed: status;
}
