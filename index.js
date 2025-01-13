const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/order"));
app.use("/orderitem", require("./routes/orderItem"))

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
