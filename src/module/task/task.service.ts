import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  /**
   *
   * @param createTaskDto
   * @returns Task
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, completed } = createTaskDto;
    const task = await this.prisma.task.create({
      data: {
        title,
        description,
        completed,
      },
    });
    if (!task) {
      this.logger.error('Error creating task in the database');
      throw new BadRequestException('Error creating task');
    }

    return task;
  }

  /**
   *
   * @returns Task[]
   */
  async findAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany();
    if (!tasks) {
      this.logger.error('Error getting tasks from the database');
      throw new BadRequestException('Error getting tasks');
    }

    return tasks;
  }

  /**
   *
   * @param id
   * @param updateTaskDto
   * @returns Task
   */
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { completed, description, title } = updateTaskDto;
    const taskFound = await this.getTaskById(id);
    if (!taskFound) {
      this.logger.error(`Error updating task with id ${id} - Task not found`);
      throw new NotFoundException('Task not found');
    }

    const task = await this.prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        completed,
      },
    });

    if (!task) {
      this.logger.error(`Error updating task with id ${id}`);
      throw new BadRequestException('Error updating task');
    }

    return task;
  }

  /**
   *
   * @param id
   */
  async remove(id: number): Promise<void> {
    const task = await this.getTaskById(id);
    if (!task) {
      this.logger.error(`Error deleting task with id ${id} - Task not found`);
      throw new NotFoundException('Task not found');
    }
    await this.prisma.task.delete({
      where: {
        id: id,
      },
    });
  }

  // Private methods

  /**
   *
   * @param id
   * @returns Task
   */
  private async getTaskById(id: number): Promise<Task> {
    return await this.prisma.task.findUnique({
      where: {
        id: id,
      },
    });
  }
}
