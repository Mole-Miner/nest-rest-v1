import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { GenresService } from './genres.service';
import { Genre } from './entities/genre.entity';

describe('GenresService', () => {
  let service: GenresService;

  const mockGenresRepository = {
    create: jest.fn().mockImplementation((dto: any) => dto),
    save: jest
      .fn()
      .mockImplementation((dto: any) =>
        Promise.resolve({ id: Date.now(), ...dto }),
      ),
    find: jest.fn().mockResolvedValue([{ id: Date.now(), name: 'genre a' }]),
    findOneBy: jest
      .fn()
      .mockImplementation(({ id }: { id: number }) =>
        Promise.resolve({ id, name: 'genre a' }),
      ),
    update: jest
      .fn()
      .mockImplementation((id: number, dto: any) =>
        Promise.resolve({ id, ...dto }),
      ),
    remove: jest
      .fn()
      .mockImplementation(({ id }: { id: number }) =>
        Promise.resolve({ id, name: 'genre a' }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenresService,
        { provide: getRepositoryToken(Genre), useValue: mockGenresRepository },
      ],
    }).compile();

    service = module.get<GenresService>(GenresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create genre', async () => {
    expect(await service.create({ name: 'genre a' })).toEqual({
      id: expect.any(Number),
      name: 'genre a',
    });
  });

  it('should find all genres', async () => {
    expect(await service.findAll()).toEqual([
      { id: expect.any(Number), name: 'genre a' },
    ]);
  });

  it('should find one genre by id', async () => {
    const id = 1;
    expect(await service.findOne(id)).toEqual({ id, name: 'genre a' });
  });

  it('should find one genre by id and update it', async () => {
    const id = 1;
    const payload = { name: 'genre a' };
    expect(await service.update(id, payload)).toEqual({ id, ...payload });
  });

  it('should find one genre by id and remove it', async () => {
    const id = 1;
    expect(await service.remove(id)).toEqual({ id, name: 'genre a' });
  });
});
