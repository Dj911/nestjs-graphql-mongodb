import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from 'src/app.module';
import { UserResolver } from './user.resolver';
import { MessageSchema, RolesSchema, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'Message', schema: MessageSchema },{name: 'Role', schema: RolesSchema}])],
    providers: [UserResolver, UserService],
})
export class UserModule { }
