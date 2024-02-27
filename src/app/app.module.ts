import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'; 
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    MongooseModule.forRootAsync({
      imports :[ConfigModule],
      inject :[ConfigService],
      useFactory:(configService:ConfigService)=>{
        console.log('ENV VAR', configService.get('DATABASE_URL'));
        const options: MongooseModuleOptions={
          uri: configService.get<string>('DATABASE_URL'),
        };
        return options;
      },
    }),
    ConfigModule.forRoot({
      cache:true,
    }),
    UserModule,
    BookModule,
    AuthorModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}

