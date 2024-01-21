const e = require("express");
const app = require("./app");
const connectDB = require("./connections/db");
const ProductsRouter = require("./routes/productsRoutes");
const usersRouter = require("./routes/usersRoutes");
const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/products", ProductsRouter);
app.use("/api/v1/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
