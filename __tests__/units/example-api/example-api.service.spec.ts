import { Test, TestingModule } from '@nestjs/testing';
import ExampleApiService from '../../../src/example-api/v1/example-api.service';

describe('ExampleApiService', () => {
  let service: ExampleApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleApiService],
    }).compile();

    service = module.get<ExampleApiService>(ExampleApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
