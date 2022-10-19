import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault, Context } from 'apollo-server-core'

import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }) => {
        return {
          token: req.headers.token
        }
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        // 'graphql-ws': true,
        'subscriptions-transport-ws': {
          onConnect: (connectionParams) => {
            
            return { token: connectionParams.token };
          },
        }
      },
      introspection: true
    }),
    UserModule,
    MongooseModule.forRoot(`mongodb+srv://ethan:supernova@cluster0.aob3a.mongodb.net/Sandbox_Oct_22`)
  ],
})
export class AppModule { }
