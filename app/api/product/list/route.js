import Product from "@/models/Product";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();
        const products = await Product.find({})
        return NextResponse.json({ success: true, status: 200, message: "Products fetched successfully", products });

    } catch (error) {
        return NextResponse.json({ success: false, status: 500, message: error.message });
    }
}