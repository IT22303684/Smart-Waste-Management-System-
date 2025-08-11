import 'express-async-errors';

import * as dotenv from 'dotenv';
dotenv.config();

import express, { application } from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';



app.use('/api/v1/users' , authenticateUser, userRouter);
app.use('/api/v1/waste', collectedWasteRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './Client/dist', 'index.html'));
});



app.use(errorHandelerMiddleware);


try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
      });
}catch(error) {
    console.log(error);
}






app.use('*', (req, res) => {
    res.status(404).json({msg: 'route not found'});
});


app.use(errorHandelerMiddleware);


try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
      });
}catch(error) {
    console.log(error);
}

