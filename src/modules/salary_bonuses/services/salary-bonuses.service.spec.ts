import { Test, TestingModule } from "@nestjs/testing";
import { SalarybonusEntity } from "../salary-bonuses.entity";
import { SalarybonusesService } from "./salary-bonuses.service"
import { Repository } from 'typeorm';
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateSalarybonusDto } from "../dtos/create-salary-bonuces.dto";
import { UpdateSalarybonusDto } from "../dtos/update-salary-bonuces.dto.ts";


describe('SalarybonusesService', () => {
  let service: SalarybonusesService;
  let salaryBonusRepository: Repository<SalarybonusEntity>;


  // bodies for tests
  const createBody: CreateSalarybonusDto = {
    name: 'Employee',
    percent_per_year: 3,
    limit_on_percent_per_year: 30,
    subordinate_percent_bonus: null,
    subordinate_lvl: null
  }

  const updateBody: UpdateSalarybonusDto = {
    name: 'Employee',
    percent_per_year: 3,
    limit_on_percent_per_year: 30,
    subordinate_percent_bonus: null,
    subordinate_lvl: null
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalarybonusesService,
        {
          provide: getRepositoryToken(SalarybonusEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<SalarybonusesService>(SalarybonusesService);
    salaryBonusRepository = module.get<Repository<SalarybonusEntity>>(getRepositoryToken(SalarybonusEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('salaryBonusRepository should be defined', () => {
    expect(salaryBonusRepository).toBeDefined();
  });

  describe('getAll', () => {
    it('should find all from table salary_bonuses', async () => {
      await service.getAll();
      expect(salaryBonusRepository.find).toHaveBeenCalled();
    });
  });

  describe('getOneById', (id = 6) => {
    it('should findOneById from table salary_bonuses', async () => {
      await service.getOneById(id);
      expect(salaryBonusRepository.findOne).toHaveBeenCalledWith({where: {id}})
    });
  });

  describe('createOne', () => {
    it('should call SalarybonusRepository.create with correct params', async () => {
      jest.spyOn(salaryBonusRepository, 'create').mockReturnValueOnce({
        id: 1,
        ...createBody
      });
      await service.createOne(
        createBody
      );
      expect(salaryBonusRepository.save)
      .toHaveBeenCalledWith({
        id: 1,
        ...createBody
      });
    });
  });

  describe('updateOne', () => {
    it('should call SalarybonusRepository.update with correct params', async () => {
      await service.updateOne(1, updateBody);
      expect(salaryBonusRepository.update)
      .toHaveBeenCalledWith(
        {id: 1},
        updateBody
      );
    });
  });

  describe('deleteOne', () => {
    it('should call SalarybonusRepository.delete with correct params', async () => {
      await service.deleteOne(1);
      expect(salaryBonusRepository.delete)
      .toHaveBeenCalledWith(
        {id: 1}
      );
    });
  });
  
});