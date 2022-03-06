import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb:27017', {
    auth: {
      username: 'root',
      password: 'root'
    },
    dbName: 'todo-list'
  })],
})
export class DatabaseModule {}
