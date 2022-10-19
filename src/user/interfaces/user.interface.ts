export interface UserInterface {
    name: string,
    email: string,
    mobileNumber: number,
    countryCode: number
}

export interface MessageInterface {
    userId: string,
    message: string
}

export interface RoleInterface {
    roleName: string
    permission: [string]
}