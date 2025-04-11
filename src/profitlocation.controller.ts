import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { nextTick } from 'process';
import { randomInt } from 'crypto';
import { Prisma } from '@prisma/client';

@Controller('data')
export class ProfitLocationController {
  constructor(private readonly prisma: PrismaService) { }

  @Post('location')
  async createLocation(@Body() data: { latitude: number; longitude: number }) {

    console.log(`Localização Recebida ${data.latitude}, ${data.longitude}`);

    return await this.prisma.locations.create({
      data: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
  }

  @Delete('profit/:id')
  async deleteProfit(@Param('id') id: number) {
    try {
      return await this.prisma.profits.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  @Get('profit')
  async getProfits(
  ) {
    return await this.prisma.profits.findMany();
  }

  @Post('profit')
  async createProfit(
    @Body() data: Prisma.profitsCreateInput,
  ) {
    return await this.prisma.profits.create({
      data
    });
  }
}
