import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        const isSeller = authSeller(userId);
        if (!isSeller) {
            return NextResponse.json({ success: false, status: 401, message: "You are not authorized to add a product" });
        }

        await connectDB();
        const products = await Product.find({})
        return NextResponse.json({ success: true, status: 200, message: "Products fetched successfully", products });

    } catch (error) {
        return NextResponse.json({ success: false, status: 500, message: error.message });
    }
}