import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Model } from 'mongoose';
import { CreateUserDto, MessagesDto, RolesResponseDto } from './dtos/user.dto';
import { MessagePayload, RoleCreate, UserById, UserRegisterInput } from './inputs/user.inputs';
import { MessageInterface, RoleInterface, UserInterface } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>, @InjectModel('Message') private readonly msgModel: Model<MessageInterface>,@InjectModel('Role') private readonly roleModel: Model<RoleInterface>) { }

    async createUserService(userPayload: UserRegisterInput): Promise<CreateUserDto> {
        const data = await this.userModel.create(userPayload)
        if (!data) throw new HttpException('Unable to create user', HttpStatus.NOT_FOUND)
        return { status: "SUCCESS", message: "Yay!", data: data.toObject() }
    }

    async getUserById(userById: UserById): Promise<CreateUserDto> {
        const data = await this.userModel.findById(userById._id)
        if (!data) throw new HttpException('Unable to find the user', HttpStatus.NOT_FOUND)
        return { status: "SUCCESS", message: "Yay!", data: data.toObject() }
    }

    async updateUserById(id: string, payload: UserRegisterInput): Promise<CreateUserDto> {
        const data = await this.userModel.findByIdAndUpdate(id, payload, { new: true })
        if (!data) throw new HttpException('Unable to find the user', HttpStatus.NOT_FOUND)
        return { status: "SUCCESS", message: "Yay!", data: data.toObject() }
    }

    async getAllUsers() {
        const data = await this.userModel.find()
        if (data.length === 0) throw new HttpException('No Data Found', HttpStatus.NOT_FOUND)
        return { status: "SUCCESS", message: "Yay!", data: data }
    }

    async addMessage(messagePayload: MessagePayload): Promise<MessagesDto> {
        const data = await this.msgModel.create(messagePayload)
        if (!data) throw new HttpException('Unable to create user', HttpStatus.NOT_FOUND)
        return data.toObject()
    }

    async updateRoleById(id: string, payload: RoleCreate): Promise<RolesResponseDto> {
        const data = await this.roleModel.findByIdAndUpdate(id, payload, { new: true })
        if (!data) throw new HttpException('Unable to find the user', HttpStatus.NOT_FOUND)
        return data.toObject()
    }
}
