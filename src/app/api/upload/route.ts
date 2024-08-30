import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import path from "path";
import { promises as fs } from "fs";

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

const fileSchema = z.object({
    originalFilename: z.string(),
    buffer: z.instanceof(Buffer),
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!(file instanceof Blob)) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const originalFilename = file.name;

        const validatedFile = fileSchema.parse({
            originalFilename,
            buffer,
        });

        const fileExtension = path.extname(validatedFile.originalFilename);
        const fileName = `${Date.now()}${fileExtension}`;
        const filePath = path.join(UPLOAD_DIR, fileName);

        await fs.mkdir(UPLOAD_DIR, { recursive: true });
        await fs.writeFile(filePath, validatedFile.buffer);

        const fileUrl = `/uploads/${fileName}`;

        return NextResponse.json({ url: fileUrl });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}




// import { NextRequest, NextResponse } from "next/server";
// import { promises as fs } from "fs";
// import { join } from "path";
// import { v4 as uuidv4 } from "uuid";
// import { z } from "zod";
//
// // Define the validation schema using zod
// const imageUploadSchema = z.object({
//     file: z.instanceof(Blob),
// });
//
// export async function POST(req: NextRequest) {
//     try {
//         // Parse form data
//         const formData = await req.formData();
//         const file = formData.get('file') as Blob;
//
//         // Validate using zod
//         const parsedData = imageUploadSchema.safeParse({ file });
//         if (!parsedData.success) {
//             return NextResponse.json({
//                 error: "Invalid file upload",
//                 status: 400,
//             });
//         }
//
//         // Generate a unique file name
//         const fileName = `${uuidv4()}.jpg`;
//
//         // Define the path to save the file
//         const filePath = join(process.cwd(), 'public', 'uploads', fileName);
//
//         // Convert the Blob to Buffer
//         const arrayBuffer = await file.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);
//
//         // Ensure the uploads directory exists
//         await fs.mkdir(join(process.cwd(), 'public', 'uploads'), { recursive: true });
//
//         // Save the file to the public/uploads directory
//         await fs.writeFile(filePath, buffer);
//
//         // Return the URL of the uploaded file
//         const fileUrl = `/uploads/${fileName}`;
//         return NextResponse.json({ url: fileUrl }, { status: 200 });
//     } catch (error) {
//         console.error("Error uploading file:", error);
//         return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
//     }
// }
