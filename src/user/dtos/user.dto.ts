import { Field, ID, ObjectType } from "@nestjs/graphql"


@ObjectType()
export class RolesResponseDto{
    @Field(type=> ID)
    _id: string
    @Field()
    roleName: string
    @Field(()=> [String])
    permission: [string]
}
@ObjectType()
export class UserResponseDto {
    @Field((type) => ID)
    _id: string
    @Field()
    name: string
    @Field()
    email: string
    @Field()
    mobileNumber: number
    @Field({ nullable: true })
    countryCode: number
    @Field(()=>RolesResponseDto)
    role: RolesResponseDto
}


@ObjectType()
export class CreateUserDto {
    @Field()
    status: 'SUCCESS' | 'FAILED' | 'ERROR'
    @Field()
    message: string
    @Field(() => UserResponseDto, { nullable: true })
    data: UserResponseDto
}

@ObjectType()
export class AllUserDetailsDto {
    @Field()
    status: 'SUCCESS' | 'FAILED' | 'ERROR'
    @Field()
    message: string
    @Field(() => [UserResponseDto], { nullable: true })
    data: UserResponseDto[]
}

@ObjectType()
export class MessagesDto {
    @Field()
    userId: string
    @Field()
    message: string
}

@ObjectType()
export class UserPermissionsSub{
    @Field(type=>ID)
    id: string
    @Field(() => RolesResponseDto)
    data: RolesResponseDto
}
