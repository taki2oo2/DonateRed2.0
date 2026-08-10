import {Schema,models,model} from "mongoose"



export interface IUser{
    clerkid:string,
    fullname:string,
    email:string,
    contactno?:string,
    city?:string,
    isDonar:boolean
}

const UserSchema = new Schema<IUser>(
    {
        clerkid:{
            type:String,
            required:true,
            unique:true,
            index: true,
        },
        fullname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        contactno:{
            type:String,
            required:false,
            unique:true,
            sparse:true
        },
        city:{
            type:String,
            required:false
        },
        isDonar:{
            type:Boolean,
            required:true,
            default:false
        }
    },{
        timestamps:true
    }
)

export const User = models.User || model<IUser>("User", UserSchema);