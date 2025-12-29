import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        await connectDB();
        const isSeller = await authSeller(userId);
        if (!isSeller) {
            return NextResponse.json({ success: false, status: 401, message: "You are not authorized to add a product" });
        }

        const formData = await request.formData();

        const name = formData.get("name");
        const description = formData.get("description");
        const price = formData.get("price");
        const offerPrice = formData.get("offerPrice");
        const category = formData.get("category");
        const files = formData.getAll("images");

        if (!files || !files.length) {
            return NextResponse.json({ success: false, status: 400, message: "Please upload at least one image" });
        }

        const results = await Promise.all(files.map(async file => {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'auto' },
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                ).end(buffer);
            })
        }));

        const images = results.map(image => image.secure_url);
        const newProduct = await Product.create({
            userId,
            name,
            description,
            category,
            price: Number(price),
            offerPrice: Number(offerPrice),
            images,
            date: Date.now(),
        });

        return NextResponse.json({ success: true, status: 201, message: "Product added successfully", newProduct });

    } catch (error) {
        return NextResponse.json({ success: false, status: 500, message: error.message });
    }
}

