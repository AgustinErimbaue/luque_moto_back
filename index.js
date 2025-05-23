const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/orders"));
app.use("/orderitems", require("./routes/ordersItems"));
app.use("/shippingaddress", require("./routes/shippingaddress"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('Usando config:', require('./config/config.js')[process.env.NODE_ENV || 'development']);
