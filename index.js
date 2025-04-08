const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/orders"));
app.use("/orderitems", require("./routes/ordersItems"));
app.use("/shippinaddress", require("./routes/shippingaddress"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
