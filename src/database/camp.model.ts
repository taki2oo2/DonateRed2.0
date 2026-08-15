import {Schema,models,model, Types} from "mongoose"

export interface ICamp{
    title:string,
    organizer:string,
    description:string,
    city:string,
    locationlink:string,
    imageurl:string,
    startDate: Date
    startTime: Date
    endDate: Date
    endTime: Date
    owner: Types.ObjectId,
}

const CampSchema = new Schema<ICamp>(
    {
        title:{
            type:String,
            required:true,
        },
        organizer:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        locationlink:{
            type:String,
            required:true
        },
        imageurl:{
            type:String,
            required:true
        },
        startDate:{
            type:Date,
            required:true
        },
        startTime:{
            type:Date,
            required:true
        },
        endDate:{
            type:Date,
            required:true
        },
        endTime:{
            type:Date,
            required:true
        },
        owner:{
            type: Schema.Types.ObjectId, ref: "User", required: true
        }
    }
)

export const Camp = models.Camp || model<ICamp>("Camp",CampSchema)