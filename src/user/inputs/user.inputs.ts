import {
    InputType, Field,/* , Int, ArgsType, ID, ObjectType */
    ArgsType,
    ID
} from '@nestjs/graphql';

import mongoose from 'mongoose'
import { type } from 'os';

@InputType()
export class UserRegisterInput {
    @Field({ nullable: true })
    mobileNumber: number;
    @Field()
    email: string;
    @Field({ nullable: true })
    name: string;
    @Field({ nullable: true })
    countryCode: number;
    @Field(type=> ID)
    role: string
    /* @Field({nullable:true})
    referralCode: string;
    @Field((type) => [UserDevicesInput])
    devices: UserDevicesInput[]; */
}

@ArgsType()
export class RoleCreate{
    @Field({nullable: true})
    roleName?: string
    @Field(type=> [String],{nullable: true})
    permission: string
}

@ArgsType()
export class UserById {
    @Field(type => ID)
    _id: string
    @Field({ nullable: true })
    email?: string
}

@ArgsType()
export class UpdateUserById {
    @Field(type => ID)
    _id: string
    @Field(() => UserRegisterInput, { nullable: true })
    payload: UserRegisterInput
}

/* @ArgsType()
export class UpdateRoleById {
    @Field(type => ID)
    _id: string
    @Field(()=> RoleCreate, {nullable: true})
    payload: RoleCreate
} */

@ArgsType()
export class MessagePayload {
    @Field(type => ID)
    userId: string
    @Field()
    message: string
}

@ArgsType()
export class GetChatFilter {
    @Field()
    userId: string
}

@ArgsType()
export class UpdateUser{
    @Field()
    emailId: string
}