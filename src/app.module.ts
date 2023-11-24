import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios/dist';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [HttpModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
