const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;


const allowedOrigins = [
  'https://luque-moto-front.vercel.app',
  'https://luque-moto-front-drqr8nquo-agustinerimbaues-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("Request from origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: false, 
}));

app.use(express.json());


app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/orders"));
app.use("/orderitems", require("./routes/ordersItems"));
app.use("/shippingaddress", require("./routes/shippingaddress"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});