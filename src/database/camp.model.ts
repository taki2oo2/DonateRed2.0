import {Schema,models,model} from "mongoose"

interface ICamp{
    title:string,
    organizer:string,
    description:string,
    city:string,
    locationlink:string,
    image:string,
    startDate: Date
    startTime: Date
    endDate: Date
    endTime: Date
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
        image:{
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
        }
    }
)

export const Camp = models.Camp || model<ICamp>("Camp",CampSchema)