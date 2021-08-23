require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(morgan("tiny"));

// Routers
app.use("/user", require("./routers/userRouter"));
app.use("/api", require("./routers/categoryRouter"));
app.use("/api", require("./routers/upload"));
app.use("/api", require("./routers/productRouter"));
app.use("/api", require("./routers/PaymentRouter"));

//connect to mongoDB
const URL = /*process.env.MONGODB_URL || */ "mongodb://localhost/ecommerce";
mongoose.connect(
  URL,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

app.get("/", (req, res) => {
  res.json({ msg: "Bismillah" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});
