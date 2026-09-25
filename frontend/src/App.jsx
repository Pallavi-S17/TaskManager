import { useEffect, useState } from "react";

function App() {
  const API = "http://localhost:5000/api/tasks";

  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    try {
      const response = await fetch(API);

      const data = await response.json();

      console.log("Tasks:", data);

      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {

    if (taskTitle.trim() === "") return;

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: taskTitle
      })
    });

    setTaskTitle("");

    loadTasks();
  };
const deleteTask = async (id) => {

  await fetch(
    `http://localhost:5000/api/tasks/${id}`,
    {
      method: "DELETE",
    }
  );

  loadTasks();
};
const toggleTask = async (id) => {

  await fetch(
    `${API}/${id}`,
    {
      method: "PATCH"
    }
  );

  loadTasks();
};
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          width: "500px",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          ✅ Task Manager
        </h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Enter a task..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "16px",
            }}
          />

          <button
            onClick={addTask}
            style={{
              background: "#667eea",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add
          </button>
        </div>

        <p
          style={{
            marginTop: "20px",
            fontWeight: "bold",
            color: "#666",
          }}
        >
          Total Tasks: {tasks.length}
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginTop: "20px",
          }}
        >
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                background: "#f8f9fa",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
       <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px"
  }}
>
  <input
    type="checkbox"
    checked={task.completed}
    onChange={() => toggleTask(task.id)}
  />

  <span
    style={{
      textDecoration: task.completed
        ? "line-through"
        : "none"
    }}
  >
    {task.title}
  </span>
</div>

              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  background: "#ff4d4f",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;