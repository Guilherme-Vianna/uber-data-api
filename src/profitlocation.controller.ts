import { Controller, Post, Body } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { nextTick } from 'process';
import { randomInt } from 'crypto';

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

  @Post('profit')
  async createProfit(
    @Body() data: { morning_profit: number; night_profit: number },
  ) {
    return await this.prisma.profits.create({
      data: {
        morning_profit: data.morning_profit,
        night_profit: data.night_profit,
      },
    });
  }
}
