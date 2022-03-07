import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './apis/users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './apis/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './apis/auth/guards/jwt-auth.guard';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [
      AppService, 
      {
        provide: APP_GUARD,
        useClass: JwtAuthGuard
      }
  ],
})
export class AppModule {}
