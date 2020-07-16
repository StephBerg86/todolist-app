const express = require("express");
const { response } = require("express");
const user = require("./models/user");
const app = express();
const PORT = process.env.PORT || 4000;

const User = require("./models").user;
const todoList = require("./models").todoList;

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.post("/echo", (req, res) => {
  res.json(req.body);
});

app.post("/users", async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email || email === " ") {
      res.status(400).send("Must provide an email address");
    } else {
      const user = await User.create(req.body);
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

app.get("/users", async (res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

app.get("/users/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const correctUser = await User.findByPk(userId);
    if (!correctUser) {
      return res.status(404).send({ message: "User not found" });
    } else {
      return res.json(correctUser);
    }
  } catch (error) {
    next(error);
  }
});

app.put("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});

app.get("/todolists", async (req, res, next) => {
  const allLists = await todoList.findAll();
  res.json(allLists);
});

app.post("/todolists", async (req, res, next) => {
  try {
    const todo = await todoList.create(req.body);
    res.json(todo);
  } catch (error) {
    next(error);
  }
});

app.put("/todoLists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const listToUpdate = await TodoList.findByPk(listId);
    if (!listToUpdate) {
      res.status(404).send("List not found");
    } else {
      const updatedList = await listToUpdate.update(req.body);
      res.json(updatedList);
    }
  } catch (e) {
    next(e);
  }
});

app.get("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [todoList],
    });
    if (user) {
      res.send(user.todoList);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    next(e);
  }
});

app.post("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.body.userId);
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      const newList = await todoList.create({ userId, ...req.body });
      res.json(newList);
    }
  } catch (error) {
    next(error);
  }
});

// Delete a user's list
app.delete("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const toDelete = await TodoList.findByPk(listId);
    if (!toDelete) {
      res.status(404).send("List not found");
    } else {
      const deleted = await toDelete.destroy();
      res.json(deleted);
    }
  } catch (e) {
    next(e);
  }
});

// Delete all user's lists
app.delete("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, { include: [TodoList] });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      user.TodoLists.forEach(async (list) => await list.destroy());
      res.status(204).send();
    }
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
