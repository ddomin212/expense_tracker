const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConnect");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const { errorHandler, notFound } = require("./middleware/errorHandler");
const { fixerConnect } = require("./config/fixerConnect");

const app = express();

dotenv.config();
connectDB();
fixerConnect();

app.use(cors());
app.set("trust proxy", 1);
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/connect", require("./routes/apiRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/newsletter", require("./routes/newsletterRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/incomes", require("./routes/incomeRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/stripe", require("./routes/paymentRoutes"));
app.use(notFound);
app.use(errorHandler);

module.exports = app;
