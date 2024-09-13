import { Inject, Injectable } from '@nestjs/common';
import { EggRecord } from './interfaces/hatchery.interface';
import { HATCHERY_MODEL } from './constants/hatchery.constants';
import { Model } from 'mongoose';


@Injectable()
export class HatcheryService {
  constructor (
    @Inject(HATCHERY_MODEL)
    private hatcheryModel: Model<EggRecord>,
  ){}

  
}
