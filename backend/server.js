const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/tasks", (req, res) => {
  const tasks = JSON.parse(
    fs.readFileSync("tasks.json", "utf8")
  );

  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {

  const tasks = JSON.parse(
    fs.readFileSync("tasks.json", "utf8")
  );

  const newTask = {
    id: Date.now(),
    title: req.body.title,
    completed: false
  };

  tasks.push(newTask);

  fs.writeFileSync(
    "tasks.json",
    JSON.stringify(tasks, null, 2)
  );

  res.json(newTask);
});

app.delete("/api/tasks/:id", (req, res) => {

  const tasks = JSON.parse(
    fs.readFileSync("tasks.json", "utf8")
  );

  const updatedTasks = tasks.filter(
    task => task.id != req.params.id
  );

  fs.writeFileSync(
    "tasks.json",
    JSON.stringify(updatedTasks, null, 2)
  );

  res.json({
    message: "Task deleted"
  });
});
app.patch("/api/tasks/:id", (req, res) => {

  const tasks = JSON.parse(
    fs.readFileSync("tasks.json", "utf8")
  );

  const task = tasks.find(
    task => task.id == req.params.id
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  task.completed = !task.completed;

  fs.writeFileSync(
    "tasks.json",
    JSON.stringify(tasks, null, 2)
  );

  res.json(task);
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
