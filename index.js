

const db = new Dexie("Todo App");
db.version(1).stores({ todos: "++id, today, time, task, with, emotions,jine, rating, thoughts, body" });

const form = document.querySelector("#new-task-form");

const time = document.querySelector("#time");
const task = document.querySelector("#task");
const withh = document.querySelector("#with");
const emoce = document.querySelector("#emoce");
const rating = document.querySelector("#rating");
const thoughts = document.querySelector("#thoughts");
const bodyfeel = document.querySelector("#bodyfeel");
const jine = document.querySelector("#jine");




const list_el = document.querySelector("#tasks");



//add todo
form.onsubmit = async (event) => {
  event.preventDefault();
  const timev = time.value;
  const taskv = task.value;
  const withhv = withh.value;
  const thoughtsv = thoughts.value;
  const bodyfeelv = bodyfeel.value;
  const jinev = jine.value;
  
  // const emocev = emoce.value;
  // const ratingv = rating.value;
  
  let emoc = document.querySelectorAll("input[type=checkbox]:checked");
  let emocev = ""
  emoc.forEach((v) => {
    if(v.checked) {
      emocev += v.value+"<br> "
    }
    
  });
  emocev+=jinev
  
  const ratingv = document.querySelector("input[type=radio]:checked").value;
  
  var current = new Date();
  const today = current.getDate().toString() + "." + (current.getMonth()+1).toString()
  await db.todos.add({today,  timev, taskv, withhv, emocev,ratingv,thoughtsv, bodyfeelv });
  await getTodos();
  // form.reset();
};
// document.getElementById("time").defaultValue = current.getHours();

//display todo
// Cítil jsem se ${todo.time} ${todo.task} ${todo.time.toLocaleDateString()} ${todo.today.toLocaleTimeString()}..
const getTodos = async () => {
  const allTodos = await db.todos.reverse().toArray();
  list_el.innerHTML = "<table>"+
  `
      <tr>
    <td>datum</td>
    <td>cas</td>
    <td>cinnost</td>
    <td>osoby</td>
    <td>emoce</td>
    <td>nalada</td>
    <td>myslenky</td>
    <td>telo</td>
    <td> </td>
    </tr>`+
  
  allTodos
  .map(
    (todo) => `
    <tr>
    <td>${todo.today}</td>
    <td>${todo.timev}</td>
    <td>${todo.taskv}</td>
    <td>${todo.withhv}</td>
    <td>${todo.emocev}</td>
    <td>${todo.ratingv}/5</td>
    <td>${todo.thoughtsv}</td>
    <td>${todo.bodyfeelv}</td>
    <td> 
    <div class="actions">
    <button class="delete" onclick="deleteTodo(${todo.id})">Vymaž záznam</button>
    </div></td>
    </tr>
    `
    )
    .join("")+"</table>";
  };
  window.onload = getTodos;
  
  //delete todo
  const deleteTodo = async ( id) => {
    await db.todos.delete(id);
    await getTodos();
  };