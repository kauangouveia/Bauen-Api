import  admin from "firebase-admin";

import serviceAccount from "../config/firebase.json";

const buckethost = "bauen-2ebf2.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: buckethost,
});


const bucket = admin.storage().bucket()

const uploadImage = (req, res, next) => {
    if(!req.file)return next();
    const imagem = req.file;
    const nameFile = Date.now() + "." + imagem.originalname.split(".").pop();

    const file = bucket.file(nameFile);

    const stream = file.creatWriteStream({
        metadata :{
            contentType: imagem.mimetype,
        },

    });
    stream.on('error', (e)=>{
        console.error(e)
    })
    stream.on('finish', async()=>{
        await file.makePublic();
        req.file.firebaseUrl = `https://storage.googleapis.com/${buckethost}/${nameFile}`;

        next();
    })
    stream.end(imagem.buffer)
};

export default uploadImage;