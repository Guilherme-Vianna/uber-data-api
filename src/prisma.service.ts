import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      if (
        params.model === 'profits' &&
        (params.action === 'create' || params.action === 'update')
      ) {
        // Type the data properly
        const data = params.args.data as
          | Prisma.profitsCreateInput
          | Prisma.profitsUpdateInput;

        if (
          'start_date' in data &&
          'end_date' in data &&
          data.start_date &&
          data.end_date
        ) {
          const startDate = new Date(data.start_date as Date | string);
          const endDate = new Date(data.end_date as Date | string);
          const hoursWorked =
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

          params.args.data = {
            ...data,
            hours_worked: new Decimal(hoursWorked.toFixed(2)),
          } as Prisma.profitsCreateInput | Prisma.profitsUpdateInput;
        }
      }
      return next(params);
    });
  }
}
