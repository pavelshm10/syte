import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://pavelsh00:Aa123456%21@test.4bsjii7.mongodb.net/test?retryWrites=true&w=majority',
    ),
    CatalogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
