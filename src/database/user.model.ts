import {Schema,models,model} from "mongoose"


export interface IUser{
    fullname:string,
    email:string,
    contactno:string,
    city:string,
    isDonar:boolean
}

const UserSchema = new Schema<IUser>(
    {
        fullname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        contactno:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        isDonar:{
            type:Boolean,
            required:true
        }
    },{
        timestamps:true
    }
)

export const User = models.User || model<IUser>("User", UserSchema);