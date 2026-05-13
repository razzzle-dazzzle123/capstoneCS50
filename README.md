# PRIORITY BASED TO-DO LIST
#### Video Demo:  <https://youtu.be/UUxskQUPtFY>
#### Description:

This is my capstone project for cs50. This is a To-Do list tracker with a special priority based seperation where we have normal/regular priority tasks in one column and the high priority tasks in
another column.
This project utilizes flask for handling the server side of things and ofcourse HTML and JS for the frontend.For styling Bootstrap framework has been utilized, and also multiple other packages have also been used, one of them being cs50's own sql library for Python.
### Features & Architecture
* **Secure Authentication:** Users can register and log in securely. Passwords are hashed using `werkzeug.security`, and sessions are managed server-side.
* **User Logins(Database Management):** User logins are required which ensure that multiple people can use the app simultaeniously with each user having their tasks stored seperately.
* **Single-Page Application (SPA) Mechanics:** The frontend communicates with the Flask API via asynchronous JavaScript `fetch()` calls. This allows users to add, edit, and delete tasks in real-time without the page ever refreshing.
* **Responsive Layout:** As Bootstrap has been utilized here,The app becomes responsive by default for both mobile as well as wide-screen devices.

### File Manifest

Below is a breakdown of the core files that power this application:

* **`app.py`**: The engine of the application. This file contains the Flask server setup, session configuration, and all backend routing (`/register`, `/login`, `/logout`, `/add`, `/update`, `/delete`). It handles database connections and strictly executes SQL commands based on the active user's session ID.
* **`tasks.db`**: The SQLite database containing two tables: `users` (storing usernames and hashed passwords) and `tasks` (storing task content, priority level, and the associated user ID).
* **`static/main.js`**: The frontend logic controller. It listens for form submissions and clicks, sends JSON payloads to the backend via the `fetch` API, and dynamically updates the Document Object Model (DOM) to reflect state changes (e.g., swapping a task text into an editable input field).
* **`templates/index.html`**: The main dashboard view. It uses Jinja syntax to initially render the user's saved tasks from the database into the two-column Bootstrap layout.
* **`templates/register.html` & `templates/login.html`**: Clean, centered, Bootstrap-styled authentication interfaces.

### Design Decisions

During the development process, several specific engineering choices were made:

**1. Seperation of HTML from JS:** instead of having everything slammed in one single HTML file it was a Design decision to have seperate files for the HTML and JS as it allows for better readability and also updatability
.

**2. Asynchronous API (`fetch`) vs. Traditional Form Submissions:**
I wanted the application to feel like a modern, native app. Instead of traditional HTML form submissions that force a total page reload, the JavaScript intercepts form submissions, sends the data to Flask in the background, and dynamically rebuilds the HTML `<li>` elements upon receiving a `"success"` status from the server.

**3. The Priority System:** Instead of clamming all the tasks under a single column I decided it would be a better idea to have a distinct seperation between tasks which are of high priority and those of normal priority , this way it can be ensured that the higher priority tasks are given the importance that is required
.

**4. Bootstrap Integration:**
To ensure the application was accessible and visually appealing across all device sizes, I opted for Bootstrap 5. This allowed me to rapidly build a responsive grid system and modern card components without writing hundreds of lines of custom CSS, keeping the codebase clean and maintainable.

### How to Run

1. Ensure you have Python and Flask installed.
2. Navigate to the project directory in your terminal.
3. Run the application using `flask run`.
4. Open the provided local host link in your browser, register a new account, and start tracking your tasks!