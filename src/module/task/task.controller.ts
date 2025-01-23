import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ResponseMessage } from 'src/decorator/responseMessage.decorator';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  @ResponseMessage('Task created successfully')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ResponseMessage('Tasks retrieved successfully')
  findAll() {
    return this.taskService.findAll();
  }

  @Patch(':id/update')
  @ResponseMessage('Task updated successfully')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ResponseMessage('Task deleted successfully')
  async remove(@Param('id') id: number) {
    return this.taskService.remove(+id);
  }
}
