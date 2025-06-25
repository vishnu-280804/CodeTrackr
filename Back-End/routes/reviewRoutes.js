import { createPartFromUri, GoogleGenAI } from "@google/genai";
import express from "express";
import multer from "multer";
import fs from "fs/promises";
const ai = new GoogleGenAI({ apiKey: "AIzaSyAUACziqIKPGHQz95VjfwbSAwn1WnogOLg" });

const router = express.Router();
const upload = multer({dest:"uploads/"})

router.post("/pdf",upload.single("pdf"),async (req,res)=>{
    try {
        const path = req.file.path;
        const fileBuffer = await fs.readFile(path);
        const fileBlob = new Blob([fileBuffer], { type: 'application/pdf' });
        const file = await ai.files.upload({
            file: fileBlob,
            config: {
                displayName: req.file.originalname,
            },
        });
    
        let getFile = await ai.files.get({name:file.name});
        while(getFile.state === "PROCESSING"){
            await new Promise((r)=>setTimeout(r,5000));
            getFile = await ai.files.get({name:file.name});
        }
        if (file.state === 'FAILED') {
            throw new Error('File processing failed.');
        }
        const fileContent = createPartFromUri(file.uri, file.mimeType);
         const content = [
            'Review this document(resume)',
            fileContent
        ];
         const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: content,
        });
        res.json({review:response.text});
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Wrong"});
    }



});

export default router;
