

const db = new Dexie("Todo App");
db.version(1).stores({ todos: "++id, todo, emoce, today, intenzita" });

const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const emoce_i = document.querySelector("#emoce");
const intenzita_i = document.querySelector("#intenzita");
const list_el = document.querySelector("#tasks");

//add todo
form.onsubmit = async (event) => {
  event.preventDefault();
  const todo = input.value;
  const emoce = emoce_i.value;
  const intenzita = intenzita_i.value;
  var today = new Date();
  await db.todos.add({ todo,emoce,today,intenzita });
  await getTodos();
  form.reset();
};
document.getElementById("time").defaultValue = current.getHours();

//display todo
const getTodos = async () => {
  const allTodos = await db.todos.reverse().toArray();
  list_el.innerHTML = allTodos
    .map(
      (todo) => `
    
    <div class="task">
    <div class="content">
    Cítil jsem se ${todo.intenzita} ${todo.emoce} ${todo.today.toLocaleDateString()} ${todo.today.toLocaleTimeString()}..
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