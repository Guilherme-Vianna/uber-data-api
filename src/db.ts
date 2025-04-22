import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === 'profits' && (params.action === 'create' || params.action === 'update')) {
    const data = params.args.data;
    if (data && data.start_date && data.end_date) {
      try {
        const startDate = new Date(data.start_date);
        const endDate = new Date(data.end_date);

        // Ensure dates are valid before calculation
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && endDate >= startDate) {
          // Calculate the difference in milliseconds
          const differenceInMs = endDate.getTime() - startDate.getTime();

          // Convert milliseconds to hours (as a decimal value)
          const hoursDifference = differenceInMs / (1000 * 60 * 60);

          // Update the 'hours_worked' field in the arguments
          // Prisma will handle converting the number to Decimal for the database
          params.args.data.hours_worked = hoursDifference;

        } else if (endDate < startDate) {
          console.warn("End date is before start date. hours_worked calculation skipped.");
          // Optionally set hours_worked to 0 or handle as an error
          params.args.data.hours_worked = 0;
        }
        else {
          console.warn("Invalid start_date or end_date provided. hours_worked calculation skipped.");
          // Optionally handle invalid dates, maybe set hours_worked to 0 or null if allowed
          if ('hours_worked' in params.args.data) {
            // Avoid setting it if it wasn't provided initially
            params.args.data.hours_worked = 0; // Or null if the schema allows
          }
        }
      } catch (error) {
        console.error("Error processing dates for hours_worked calculation:", error);
        // Decide how to handle errors - maybe skip setting hours_worked or throw
      }
    }
  }

  return next(params);
});

export default prisma;

