const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors({
  origin: [
    "https://luque-moto-front.vercel.app", 
    "https://luque-moto-front-egzio8gqy-agustinerimbaues-projects.vercel.app", 
    "http://localhost:3000"
  ],
  credentials: true
}));
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/orders"));
app.use("/orderitems", require("./routes/ordersItems"));
app.use("/shippingaddress", require("./routes/shippingaddress"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
