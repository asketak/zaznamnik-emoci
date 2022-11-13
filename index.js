

const db = new Dexie("Todo App");
db.version(1).stores({ todos: "++id, today, time, task, with, emotions, rating, thoughts, body" });

const form = document.querySelector("#new-task-form");

  const time = document.querySelector("#time");
  const task = document.querySelector("#task");
  const withh = document.querySelector("#with");
  const emoce = document.querySelector("#emoce");
  const rating = document.querySelector("#rating");
  const thoughts = document.querySelector("#thoughts");
  const bodyfeel = document.querySelector("#bodyfeel");

const list_el = document.querySelector("#tasks");



//add todo
form.onsubmit = async (event) => {
  event.preventDefault();
  const timev = time.value;
  const taskv = task.value;
  const withhv = withh.value;
  const emocev = emoce.value;
  const ratingv = rating.value;
  const thoughtsv = thoughts.value;
  const bodyfeelv = bodyfeel.value;


  
  
  var current = new Date();
  const today = current.getDate().toString() + ":" + (current.getMonth()+1).toString()
  await db.todos.add({today,  timev, taskv, withhv, emocev,ratingv,thoughtsv, bodyfeelv });
  await getTodos();
  // form.reset();
};
// document.getElementById("time").defaultValue = current.getHours();

//display todo
// Cítil jsem se ${todo.time} ${todo.task} ${todo.time.toLocaleDateString()} ${todo.today.toLocaleTimeString()}..
const getTodos = async () => {
  const allTodos = await db.todos.reverse().toArray();
  list_el.innerHTML = allTodos
  .map(
    (todo) => `
    
    <div class="task">
    <div class="content">
    // Cítil jsem se ${todo.timev} ${todo.taskv} ${todo.withv}}..
    // Cítil jsem se ${todo.emocev} ${todo.ratingv} ${todo.thoughtsv}}..
    </div>
    <div class="content2">
    ${todo.todo}
    </div>
    <div class="actions">
    <button class="delete" onclick="deleteTodo(${todo.id})">Vymaž záznam</button>
    </div>
    </div>
    `
    )
    .join("");
  };
  window.onload = getTodos;
  
  //delete todo
  const deleteTodo = async ( id) => {
    await db.todos.delete(id);
    await getTodos();
  };