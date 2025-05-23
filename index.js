const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");


const corsOptions = {
  origin: 'https://luque-moto-front.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/orders"));
app.use("/orderitems", require("./routes/ordersItems"));
app.use("/shippingaddress", require("./routes/shippingaddress"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
