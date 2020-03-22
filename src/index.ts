import "reflect-metadata";

import { createConnection } from "typeorm";

import express from "express";

import { User } from "./entity/User";

import { Post } from "./entity/Post";

const server = express();

createConnection()
  .then(async () => {
    server.use(express.json());

    server.post("/users", async (req, res) => {
      const data = req.body;

      const user = await User.save(data);

      return res.json(user);
    });

    server.get("/users", async (req, res) => {
      const users = await User.find({
        relations: ["posts"],
      });

      return res.json(users);
    });

    server.post("/users/:userId/posts", async (req, res) => {
      const postData = req.body;

      const { userId } = req.params;

      const user = await User.findOne(userId);

      const post = await Post.save({ ...postData, user });

      return res.json(post);
    });

    server.listen(3333, () => {
      console.log("server started");
    });
  })

  .catch((error) => console.log(error));
