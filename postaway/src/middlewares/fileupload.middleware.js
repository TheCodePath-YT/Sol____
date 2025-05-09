import multer from 'multer';
import path from 'path';
import fs from 'fs';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g,"_")+file.originalname)
    }
});
export const upload = multer({ storage: storage });