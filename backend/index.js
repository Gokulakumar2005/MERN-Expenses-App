import "dotenv/config";
import cors from "cors";
import express from "express";
import configureDB from "./config/db.js";

import UserCtrl from "./app/controllers/Ctrl.js";
import ExpenseCtrl from "./app/controllers/ExpenseCtrl.js";
import { authenticateUser } from "./app/middlewares/auth.js";
import { upload } from "./config/cloudinary.js";
const port = process.env.PORT
const app = express();
configureDB();
app.use(express.json());
app.use(cors());



app.post("/user/register", UserCtrl.register)
app.post("/user/generate-otp", UserCtrl.generateOtp);
app.post("/user/verify-otp", UserCtrl.verifyOtp);
app.post("/user/google-login", UserCtrl.googleLogin);
app.get("/user/account", authenticateUser, UserCtrl.account)


app.post("/expense/add", authenticateUser, upload.single('receipt'), ExpenseCtrl.create);
app.get("/expense/list", authenticateUser, ExpenseCtrl.list);
app.get("/expense/stats", authenticateUser, ExpenseCtrl.getStats);
app.delete("/expense/remove/:id", authenticateUser, ExpenseCtrl.remove);
app.put("/expense/update/:id", authenticateUser, upload.single('receipt'), ExpenseCtrl.update);

app.listen(port, () => {
    console.log(`sever is running on the port is ${port}`)
})