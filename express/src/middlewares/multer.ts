import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (_, file, cb) => {
        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png',
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, DOCX, JPG, and PNG files are allowed.'));
        }
    }
})

export const uploads = upload.fields([{name:'resume',maxCount:1},{name:'image',maxCount:1}]);