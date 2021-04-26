import express from "express";
import { authRouter } from "./auth";
import { productRoutes } from "./product";
import { userRoutes } from "./user";
import { cartRoutes } from "./cart";
import { articleRoutes } from "./article";
import { reviewRoutes } from "./review";
import { orderRoutes } from "./order";
const services = express.Router();

services.use("/auth", authRouter);
services.use("/users", userRoutes);
services.use("/products", productRoutes);
services.use("/cart", cartRoutes);
services.use("/blog", articleRoutes);
services.use("/review", reviewRoutes);
services.use("/order", orderRoutes);

export default services;
