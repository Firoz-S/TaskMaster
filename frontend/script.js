document.addEventListener("DOMContentLoaded", () => {
  const toDoInput = document.getElementById("todoinput");
  const AddTaskBtn = document.getElementById("add-task-btn");
  const toDOList = document.getElementById("todo-list");

  // Fetch tasks from backend
  async function fetchTasks() {
    const res = await fetch("http://localhost:3000/tasks");
    const tasks = await res.json();
    toDOList.innerHTML = "";
    tasks.forEach((task) => render(task));
  }

  // Add new task to backend
  AddTaskBtn.addEventListener("click", async () => {
    const text = toDoInput.value.trim();
    if (!text) return;

    const res = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const newTask = await res.json();
    render(newTask);
    toDoInput.value = "";
  });

  // Render task
  function render(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>${task.text}</span>
      <button>Delete</button>
    `;

    // Toggle completed (optional)
    li.querySelector("span").addEventListener("click", async () => {
      task.completed = !task.completed;
      li.classList.toggle("completed");

      // Optionally, you can implement backend PATCH request to update completed
      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: task.completed }),
      });
    });

    // Delete task
    li.querySelector("button").addEventListener("click", async () => {
      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "DELETE",
      });
      li.remove();
    });

    toDOList.appendChild(li);
  }

  fetchTasks();
});
