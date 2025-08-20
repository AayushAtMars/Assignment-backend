import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import router from "./routes/allowanceRoutes.js";
import userRouter from "./routes/userRoutes.js";


dotenv.config();
const app = express()
const port = process.env.PORT||2000 ;

dbConnect();
app.use(express.json());
// app.use(cors());

app.use('/api/allowances', router);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
