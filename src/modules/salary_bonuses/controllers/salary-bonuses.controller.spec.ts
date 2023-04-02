import { Test, TestingModule } from '@nestjs/testing';
import { SalarybonusesService } from '../services/salary-bonuses.service';
import { SalarybonusesController } from './salary-bonuses.controller';
import { Response } from 'express';
import { BadRequestException } from '@nestjs/common/exceptions';

describe('SalarybonusesController', () => {
  let controller: SalarybonusesController;

  const statuseResponseMock = {
    send: jest.fn((x) => x),
  };

  const responseMock = {
    status: jest.fn(() => statuseResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalarybonusesController],
      providers: [
        {
          provide: SalarybonusesService,
          useValue: {
            getAll: jest.fn(),
            getOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SalarybonusesController>(SalarybonusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return SalarybonusesEntity[]', async () => {
      try {
        await controller.getAll(responseMock);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('getOneById', () => {
    it('should return SalarybonusesEntity', async () => {
      try {
        await controller.getOneById(1, responseMock);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
