import { Module } from '@nestjs/common';

import { DbModule } from 'src/db/db.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
