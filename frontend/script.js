document.addEventListener("DOMContentLoaded", () => {
  const toDoInput = document.getElementById("todoinput");
  const addTaskBtn = document.getElementById("add-task-btn");
  const toDoList = document.getElementById("todo-list");

  async function fetchTasks() {
    try {
      const res = await fetch("/tasks");
      const tasks = await res.json();
      toDoList.innerHTML = "";
      tasks.forEach(renderTask);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  }

  addTaskBtn.addEventListener("click", async () => {
    const text = toDoInput.value.trim();
    if (!text) return;

    try {
      const res = await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const newTask = await res.json();
      renderTask(newTask);
      toDoInput.value = "";
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  });

  function renderTask(task) {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} />
      <span>${task.text}</span>
      <button>Delete</button>
    `;

    // UPDATE (checkbox)
    li.querySelector("input").addEventListener("change", async (e) => {
      await fetch(`/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: e.target.checked }),
      });
      fetchTasks();
    });

    // DELETE
    li.querySelector("button").addEventListener("click", async () => {
      await fetch(`/tasks/${task.id}`, { method: "DELETE" });
      fetchTasks();
    });

    toDoList.appendChild(li);
  }

  fetchTasks();
});
