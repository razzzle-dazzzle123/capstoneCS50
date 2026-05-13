document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // 1. UI CONSTANTS (SVGs)
  // ==========================================
  const PENCIL_ICON = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none">
        <path fill="#ffbc44" d="m2.848 16.615l-1.39 5.927l5.927-1.39l.232-.232l-4.536-4.536z"/>
        <path fill="#ffdda1" d="M5.349 18.651L3.08 16.383l-.233.232l-1.39 5.927z"/>
        <path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="m2.848 16.615l-1.39 5.927l5.927-1.39l.232-.232l-4.536-4.536z"/>
        <path fill="#ffef5e" d="m3.081 16.384l4.536 4.536L20.049 8.49l-4.53-4.547z"/>
        <path fill="#fff9bf" d="M15.53 3.955L3.071 16.371l2.264 2.272L17.793 6.227z"/>
        <path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="m3.081 16.384l4.536 4.536L20.049 8.49l-4.53-4.547z"/>
        <path fill="#e4f1f5" stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="m16.82 2.643l-1.301 1.3l4.53 4.546l1.31-1.31z"/>
        <path fill="#ff808c" d="M22.005 6.533a1.834 1.834 0 0 0 0-2.593l-1.946-1.944a1.83 1.83 0 0 0-2.593 0l-.646.647l4.538 4.536z"/>
        <path fill="#ffbfc5" d="m21.032 2.967l-.973-.972a1.83 1.83 0 0 0-2.593 0l-.646.648l2.269 2.268z"/>
        <path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M22.005 6.533a1.834 1.834 0 0 0 0-2.593l-1.946-1.944a1.83 1.83 0 0 0-2.593 0l-.646.647l4.538 4.536z"/>
      </g>
    </svg>
  `;

  const CROSS_ICON = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none">
        <path fill="#ff808c" d="m7.45 12l-6.363 6.363a1.01 1.01 0 0 0 0 1.43l3.12 3.12a1.01 1.01 0 0 0 1.43 0L12 16.55l6.363 6.363a1.01 1.01 0 0 0 1.43 0l3.12-3.12a1.01 1.01 0 0 0 0-1.43L16.55 12l6.363-6.363a1.01 1.01 0 0 0 0-1.43l-3.12-3.12a1.01 1.01 0 0 0-1.43 0L12 7.45L5.637 1.088a1.01 1.01 0 0 0-1.43 0l-3.12 3.12a1.01 1.01 0 0 0 0 1.43z"/>
        <path fill="#ffbfc5" d="m1.088 19.792l1.56 1.56L21.352 2.648l-1.56-1.56a1.01 1.01 0 0 0-1.43 0L12 7.45L5.637 1.087a1.01 1.01 0 0 0-1.43 0l-3.12 3.12a1.01 1.01 0 0 0 0 1.43L7.45 12l-6.362 6.363a1.01 1.01 0 0 0 0 1.43"/>
        <path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="m7.45 12l-6.363 6.363a1.01 1.01 0 0 0 0 1.43l3.12 3.12a1.01 1.01 0 0 0 1.43 0L12 16.55l6.363 6.363a1.01 1.01 0 0 0 1.43 0l3.12-3.12a1.01 1.01 0 0 0 0-1.43L16.55 12l6.363-6.363a1.01 1.01 0 0 0 0-1.43l-3.12-3.12a1.01 1.01 0 0 0-1.43 0L12 7.45L5.637 1.088a1.01 1.01 0 0 0-1.43 0l-3.12 3.12a1.01 1.01 0 0 0 0 1.43z"/>
      </g>
    </svg>
  `;

  // ==========================================
  // 2. MAIN APP LOGIC (Dashboard Page Only)
  // ==========================================
  let taskForm = document.getElementById("taskForm");
  let board = document.getElementById("board");

  // Only run this code if we are actually on the Dashboard
  if (taskForm && board) {
    // --- A. ADDING A NEW TASK ---
    taskForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let taskInput = document.getElementById("taskID");
      let taskValue = taskInput.value;

      let isHighPriority = document.getElementById("priorityCheck").checked;
      let priorityValue = isHighPriority ? "high" : "normal";

      if (taskValue.trim() === "") return;

      fetch("/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: taskValue, priority: priorityValue }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            let li = document.createElement("li");
            li.className =
              "list-group-item d-flex justify-content-between align-items-center";

            let span = document.createElement("span");
            span.className = "task-text flex-grow-1";
            span.textContent = data.task;

            // Group the buttons in a div so they stay on the right
            let btnGroup = document.createElement("div");

            let editBtn = document.createElement("button");
            editBtn.className = "btn btn-sm btn-outline-warning edit-btn me-1";
            editBtn.setAttribute("data-id", data.id);
            editBtn.innerHTML = PENCIL_ICON;

            let deleteBtn = document.createElement("button");
            deleteBtn.className = "btn btn-sm btn-outline-danger delete-btn";
            deleteBtn.setAttribute("data-id", data.id);
            deleteBtn.innerHTML = CROSS_ICON;

            btnGroup.appendChild(editBtn);
            btnGroup.appendChild(deleteBtn);

            li.appendChild(span);
            li.appendChild(btnGroup);

            // Route to correct column
            if (data.priority === "high") {
              document.getElementById("highPriorityList").appendChild(li);
            } else {
              document.getElementById("normalTaskList").appendChild(li);
            }

            // Reset the form
            taskInput.value = "";
            document.getElementById("priorityCheck").checked = false;
          }
        })
        .catch((error) => console.error("Error adding task:", error));
    });

    // --- B. DELETING & EDITING TASKS ---
    board.addEventListener("click", function (e) {
      // -- Delete Logic --
      let deleteBtn = e.target.closest(".delete-btn");
      if (deleteBtn) {
        let taskId = deleteBtn.getAttribute("data-id");
        let listItem = deleteBtn.closest("li");

        fetch("/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: taskId }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") listItem.remove();
          })
          .catch((error) => console.error("Error deleting task:", error));
      }

      // -- Edit Logic --
      let editBtn = e.target.closest(".edit-btn");
      if (editBtn) {
        let listItem = editBtn.closest("li");
        let span = listItem.querySelector(".task-text");
        let taskId = editBtn.getAttribute("data-id");

        if (listItem.classList.contains("editing")) {
          // SAVE MODE: Send the updated text to the server
          let editInput = listItem.querySelector(".edit-input");
          let newValue = editInput.value;

          if (newValue.trim() === "") return;

          fetch("/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: taskId, task: newValue }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "success") {
                span.textContent = newValue;
                span.style.display = "inline";
                editInput.remove();
                listItem.classList.remove("editing");
              }
            })
            .catch((error) => console.error("Error updating task:", error));
        } else {
          // EDIT MODE: Swap the text for an input box
          listItem.classList.add("editing");
          span.style.display = "none";

          let input = document.createElement("input");
          input.type = "text";
          input.className = "form-control form-control-sm me-2 edit-input";
          input.value = span.textContent.trim();

          // FIX: Insert the input before the button wrapper div!
          let btnGroup = editBtn.closest("div");
          listItem.insertBefore(input, btnGroup);

          input.focus();
        }
      }
    });
  }

  // ==========================================
  // 3. REGISTRATION LOGIC
  // ==========================================
  let registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let username = document.getElementById("regUsername").value;
      let password = document.getElementById("regPassword").value;

      fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            window.location.href = "/login";
          } else {
            document.getElementById("errorMessage").textContent = data.message;
          }
        })
        .catch((error) => console.error("Registration error:", error));
    });
  }

  // ==========================================
  // 4. LOGIN LOGIC
  // ==========================================
  let loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let username = document.getElementById("logUsername").value;
      let password = document.getElementById("logPassword").value;

      fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            window.location.href = "/";
          } else {
            document.getElementById("errorMessage").textContent = data.message;
          }
        })
        .catch((error) => console.error("Login error:", error));
    });
  }
});
