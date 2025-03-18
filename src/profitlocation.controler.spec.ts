import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { ProfitLocationController } from './profitlocation.controller';

describe('ProfitLocationController', () => {
  let controller: ProfitLocationController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfitLocationController],
      providers: [
        {
          provide: PrismaService,
          useValue: {
            locations: {
              create: jest.fn(),
            },
            profits: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ProfitLocationController>(ProfitLocationController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createLocation', () => {
    it('should create a location', async () => {
      const mockData = { latitude: 37.7749, longitude: -122.4194 };
      const mockResult = { id: 1, ...mockData, createdAt: new Date() };

      (prismaService.locations.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await controller.createLocation(mockData);
      expect(result).toEqual(mockResult);
      expect(prismaService.locations.create).toHaveBeenCalledWith({ data: mockData });
    });
  });

  describe('createProfit', () => {
    it('should create a profit', async () => {
      const mockData = { morning_profit: 150.75, night_profit: 200.25 };
      const mockResult = { id: 1, ...mockData, createdAt: new Date() };

      (prismaService.profits.create as jest.Mock).mockResolvedValue(mockResult);

      const result = await controller.createProfit(mockData);
      expect(result).toEqual(mockResult);
      expect(prismaService.profits.create).toHaveBeenCalledWith({ data: mockData });
    });
  });
});
