import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const {userId} = getAuth(request);
        connectDB();
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({success:false , message:'user not found' , status:404})
        }
        return NextResponse.json({success:true,status:200,user})

    } catch (error) {
        return NextResponse.json({success:false,status:500,message:error.message})
    }
}