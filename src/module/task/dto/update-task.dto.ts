import { IsBoolean, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsBoolean()
  completed?: boolean;
}
