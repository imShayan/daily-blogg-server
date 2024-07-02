import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// const storage = new GridFsStorage({
//     url: `mongodb+srv://${username}:${password}@dailyblog.qfqvpq0.mongodb.net/?retryWrites=true&w=majority&appName=DailyBlog`,
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//         const match = ['image/jpeg', 'image/png'];
//         if (match.indexOf(file.mimetype) === -1) {
//             return `${Date.now()}-blog-${file.originalname}`;
//         }
//         return {
//             bucketName: 'photos',
//             filename: `${Date.now()}-blog-${file.originalname}`
//         };
//     }
// });

const storage = multer.diskStorage({
    destination: function(req, file ,cb){
        return cb(null, './public/images')
    },
    filename: function(req ,file, cb){
        cb(null ,`${Date.now()}_${file.originalname}`);
    }
})

const upload = multer({ storage });

export default upload;