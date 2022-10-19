import { HttpException, HttpStatus } from '@nestjs/common'
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler'
import { Resolver, Query, Mutation, Args, Context, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { AllUserDetailsDto, CreateUserDto, MessagesDto, RolesResponseDto, UserPermissionsSub, UserResponseDto } from './dtos/user.dto'
import { GetChatFilter, MessagePayload, RoleCreate, UpdateUser, UpdateUserById, UserById, UserRegisterInput } from './inputs/user.inputs'
import { UserService } from './user.service'
const pubSub = new PubSub()

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) { }
    @Query(returns => CreateUserDto)
    getUserById(@Args() args: UserById) {
        return this.userService.getUserById(args)
    }

    @Mutation(returns => CreateUserDto)
    async createUser(@Args('input') input: UserRegisterInput) {
        return this.userService.createUserService(input)
    }

    @Mutation(returns => CreateUserDto)
    async updateUser(@Args() args: UpdateUserById) {
        const data = await this.userService.updateUserById(args._id, args.payload)
        // const userDetails = await this.userService.getAllUsers()
        pubSub.publish('userDetailsSub',{getUserPermissionsSub: {id: data.data._id.toString(), data:data.data}})
        return data
    }

    @Query(returns => AllUserDetailsDto)
    getAllUsers(@Context() ctx) {
        console.log('TKN: ', ctx.token);

        return this.userService.getAllUsers()
    }

    @Mutation(returns => MessagesDto)
    async sendMessage(@Args() payload: MessagePayload) {
        const message = await this.userService.addMessage(payload)
        // console.log('MSG: ',message,typeof message.userId,message.userId.toString());
        
        pubSub.publish('messageAdded', { getChat: {message: message.message,userId: message.userId.toString()} })
        return message
    }

    @Subscription(returns => MessagesDto, {
        // Manipulate response of the subscription
        /* async resolve(this: UserResolver,value){
            console.log('VAL: ',value,value.getChat,value.getChat.userId);
            const data = await this.getUserById({_id: value.getChat.userId})
            console.log( '\nVAL: ',value,'DTA: ',data);
            return value
            
        }, */
        filter (/* this: UserResolver, */payload, variable) {

            return payload.getChat.userId === variable.userId
        }

    })
    async getChat(@Args('userId') userId: string) {
        
        return pubSub.asyncIterator('messageAdded')
    }

    @Subscription(returns => UserPermissionsSub,{
        filter: (payload,variable)=>{
            console.log('PAY: ',payload,'\nVAR: ',variable);
            
            return payload.getUserPermissionsSub.id === variable.roleId
        }
    })
    async getUserPermissionsSub(@Args('roleId') roleId: string,@Context() ctx){
        console.log('tkn: ',ctx);
        
        // if(!ctx.token) throw new HttpException('Unauthorize',HttpStatus.UNAUTHORIZED)
        const test = pubSub.asyncIterator('userDetailsSub')
        // const test = pubSub.subscribe('userDetailsSub', (vale)=>vale)
        console.log('TST: ',test);
        
        return test
    }

    @Mutation(returns => RolesResponseDto)
    async updateRole(@Args('roleId') roleId: string,@Args() args: RoleCreate) {
        const data = await this.userService.updateRoleById(roleId,args)
        // const userDetails = await this.userService.getAllUsers()
        pubSub.publish('userDetailsSub',{getUserPermissionsSub: {id: data._id.toString(), data}})
        return data
    }
}