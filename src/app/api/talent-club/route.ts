import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { upload } from "@/lib/multer";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();

// Enable body parsing manually for multipart form
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Extract all fields
    const fullName = formData.get("entry.111111111") as string;
    const email = formData.get("entry.222222222") as string;
    const phone = formData.get("entry.333333333") as string | null;
    const country = formData.get("entry.444444444") as string;
    const linkedin = formData.get("entry.555555555") as string;
    const currentRole = formData.get("entry.666666666") as string;
    const yearsExperience = formData.get("entry.777777777") as string;
    const industry = formData.get("entry.888888888") as string;
    const modeOfWork = formData.get("entry.999999999") as string;
    const dietary = formData.get("entry.101010101") as string | null;
    const accessibility = formData.get("entry.121212121") as string | null;
    const consent = formData.get("entry.141414141") as string;
    const comments = formData.get("entry.151515151") as string | null;
    const motivation = formData.get("entry.191919191") as string;

    // Handle CV upload
    let cvUrl = null;
    const cvFile = formData.get("cv") as File | null;

    if (cvFile) {
      const arrayBuffer = await cvFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploaded = await cloudinary.uploader.upload_stream({
        resource_type: "raw",
        folder: "talent-club-cvs",
      });

      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            folder: "talent-club-cvs",
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
        stream.end(buffer);
      }).then((result: any) => {
        cvUrl = result.secure_url;
      });
    }

    // Store in DB
    const entry = await prisma.talentClubApplication.create({
      data: {
        fullName,
        email,
        phone: phone || "",
        country,
        linkedin,
        currentRole,
        yearsExperience,
        industry,
        modeOfWork,
        dietary: dietary || "",
        accessibility: accessibility || "",
        consent,
        comments: comments || "",
        motivation,
        cvUrl: cvUrl || "",
      },
    });

    return NextResponse.json({ success: true, id: entry.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
