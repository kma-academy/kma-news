/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { ZaloService } from './zalo-auth.service';
export interface ZaloModuleOption {
  secret: string;
  appId: string;
}
export interface ZaloModuleAsyncOption {
  inject: any[];
  useFactory: (...args: any[]) => ZaloModuleOption;
}
@Module({})
export class ZaloModule {
  static register(options: ZaloModuleOption): DynamicModule {
    return {
      module: ZaloModule,
      imports: [
        HttpModule.register({
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }),
      ],
      providers: [
        ZaloService,
        {
          provide: 'ZALO_SECRET',
          useValue: options.secret,
        },
        {
          provide: 'ZALO_APPID',
          useValue: options.appId,
        },
      ],
      exports: [ZaloService],
    };
  }

  static registerAsync(options: ZaloModuleAsyncOption): DynamicModule {
    return {
      module: ZaloModule,
      imports: [
        HttpModule.register({
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }),
      ],
      providers: [
        {
          inject: options.inject,
          useFactory: options.useFactory,
          provide: 'ZALO_MODULE_OPTION',
        },
        ZaloService,
      ],
      exports: [ZaloService],
    };
  }
}

export { ZaloService };
