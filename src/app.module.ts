import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfitLocationController } from './profitlocation.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, ProfitLocationController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
