from cs50 import SQL
from flask import Flask,render_template , request , jsonify,session,redirect
from werkzeug.security import check_password_hash,generate_password_hash

app = Flask(__name__)

app.secret_key = "super_secret_capstone_key"

db = SQL("sqlite:///tasks.db")

db.execute('''
    CREATE TABLE IF NOT EXISTS users(
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           username TEXT NOT NULL UNIQUE,
           hash TEXT NOT NULL
           )
''')

db.execute('''
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        task TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
''')

@app.route('/')
def index():
  saved_tasks= db.execute("SELECT * FROM tasks")
  return render_template("index.html",tasks=saved_tasks)


@app.route('/register',methods=['GET','POST'])
def register():
  if request.method=="POST":
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
      return jsonify({"status":"error","message":"INVALID USERNAME AND PASSWORD"}),400
    
    rows = db.execute("SELECT * FROM users WHERE username = ?",username)
    if len(rows)>0:
      return jsonify ({"status":"error","message":"username is already taken"})
    hashpass = generate_password_hash(password)
    db.execute("INSERT INTO users (username,hash) VALUES(?,?)",username,hashpass)
    return jsonify({"status":"success"}),200
  else:
    return render_template("register.html")


@app.route('/login',methods=["GET","POST"])
def login():

  if request.method =="POST":
    session.clear()

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
      return jsonify({"status:":"error","message":"u must enter a username or password"})
    rows = db.execute("SELECT * FROM users WHERE username =?",username)
    if len(rows)==0 or not check_password_hash(rows[0]["hash"],password):
      return jsonify({"status":"error","message":"Invalid username or password"})
    session["user_id"] = rows[0]["id"]
    return jsonify({"status":"success"}),200
  return render_template("login.html")
  

@app.route('logout')
def logout():
  session.clear()
  return redirect("/login")



@app.route('/add',methods = ["POST"])
def add_post():
  data = request.get_json()
  task_content = data.get('task')

  if task_content:
    id=db.execute("INSERT INTO tasks(task) VALUES(?)",task_content)
    return jsonify({"status": "success", "task": task_content,"id":id}), 200
  return jsonify({"status":"error"}),400


@app.route('/delete',methods=["POST"])
def delete_task():
  
  data = request.get_json()
  task_id = data.get('id')

  if task_id:
    db.execute("DELETE FROM tasks WHERE id=?",task_id)
    return jsonify({"status":"success"}),200
  return jsonify({"status":"error"}),400

@app.route('/update',methods=["POST"])
def update_task():
  data = request.get_json()
  task_id = data.get('id')
  task_content = data.get('task')

  if task_id and task_content: 
    db.execute("UPDATE tasks SET task=? where  id=?",task_content,task_id)
    return jsonify({"status":"success"}),200
  return jsonify({"status":"error"}),400

if __name__=="__main__":
  app.run(debug=True)