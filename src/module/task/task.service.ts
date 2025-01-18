import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Service } from 'src/service';

@Injectable()
export class TaskService extends Service {
  constructor() {
    super(TaskService.name);
  }
  create(createTaskDto: CreateTaskDto) {
    this.logger.log('Creating a new task');
    return 'This action adds a new task';
  }

  findAll() {
    this.logger.log('Getting all tasks from the database');
    return `This action returns all task`;
  }

  findOne(id: number) {
    this.logger.log(`Getting task with id ${id}`);
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    this.logger.log(`Updating task with id ${id}`);
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    this.logger.log(`Removing task with id ${id}`);
    return `This action removes a #${id} task`;
  }
}
