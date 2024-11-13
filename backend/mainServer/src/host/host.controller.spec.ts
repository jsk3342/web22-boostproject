// host.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { HostController } from './host.controller';
import { HostService } from './host.service';
import { HttpStatus } from '@nestjs/common';
import {describe, expect, jest} from '@jest/globals';

describe('HostController', () => {
  let controller: HostController;
  let service: HostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HostController],
      providers: [HostService],
    }).compile();

    controller = module.get<HostController>(HostController);
    service = module.get<HostService>(HostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return 200 with host data for valid request', async () => {
    const mockUuid = 'test-uuid';
    const mockHostData = `session-info-for-${mockUuid}`;

    jest.spyOn(service, 'generateStreamKey').mockResolvedValue(mockHostData);

    const req = {
      headers: {
        host: 'http://example.com',
        'content-type': 'application/json',
      },
      body: {
        uuid: mockUuid,
      },
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await controller.generateStreamKey(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ 'host-data': mockHostData });
  });

  it('should return 400 for invalid request with missing uuid', async () => {
    jest.spyOn(service, 'generateStreamKey').mockResolvedValue(undefined);

    const req = {
      headers: {
        host: 'http://example.com',
        'content-type': 'application/json',
      },
      body: {
        // uuid가 없는 비정상적인 요청
      },
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await controller.generateStreamKey(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });

  it('should return 400 for invalid request with incorrect content-type', async () => {
    jest.spyOn(service, 'generateStreamKey').mockResolvedValue(undefined);

    const req = {
      headers: {
        host: 'http://example.com',
        'content-type': 'text/plain',
      },
      body: {
        uuid: 'test-uuid',
      },
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await controller.generateStreamKey(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });
});
