import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/core/prisma.service';
import { Service } from 'src/service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService extends Service {
  constructor(private readonly prisma: PrismaService) {
    super(TaskService.name);
  }
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        completed: createTaskDto.completed,
      },
    });
    if (!task) {
      throw new Error('Error creating task');
    }
    this.logger.log('Creating a new task');
    return task;
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany();
    if (!tasks) {
      throw new Error('Error getting tasks');
    }
    this.logger.log('Getting all tasks from the database');
    return tasks;
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: {
        id: id,
      },
    });

    if (!task) {
      throw new Error('Error getting task');
    }
    this.logger.log(`Getting task with id ${id}`);
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title: updateTaskDto.title,
        description: updateTaskDto.description,
        completed: updateTaskDto.completed,
      },
    });
    if (!task) {
      throw new Error('Error updating task');
    }

    this.logger.log(`Updating task with id ${id}`);
    return task;
  }

  async remove(id: number): Promise<{ message: string }> {
    const task = await this.prisma.task.delete({
      where: {
        id: id,
      },
    });
    if (!task) {
      throw new Error('Error deleting task');
    }

    this.logger.log(`Removing task with id ${id}`);
    return { message: `Task with ID ${task.id} deleted successfully` };
  }
}
