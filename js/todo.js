const toDoForm=document.getElementById('todo-form');
const toDoInput=document.querySelector('#todo-form input');
const toDoList=document.getElementById('todo-list');
const toDo=document.querySelector('#todo');
toDo.classList.add('todos_pos');
const TODOS_KEY='todos';
let toDos=[];

function saveToDos(){
    localStorage.setItem('todos',JSON.stringify(toDos));
}
function deleteToDo(event){
    const li=event.target.parentElement;
    toDos=toDos.filter(toDo=> toDo.id !== parseInt(li.id))
    li.remove();
    saveToDos();
}
function paintToDo(newTodo){
    const li=document.createElement('li');
    li.id=newTodo.id;
    const span=document.createElement('span');
    span.innerText=newTodo.text;
    const button=document.createElement('button');
    button.innerText='완료👊';
    button.classList.add('btn_');
    button.addEventListener('click',deleteToDo);
    li.appendChild(button);
    li.appendChild(span);
    toDoList.appendChild(li);
}
function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo=toDoInput.value;
    toDoInput.value='';
    const newTodoOjb={
        text:newTodo,
        id:Date.now(),
    }
    toDos.push(newTodoOjb);
    paintToDo(newTodoOjb);
    saveToDos();
}


toDoForm.addEventListener('submit',handleToDoSubmit);


const savedTodos=localStorage.getItem(TODOS_KEY)

if (savedTodos !== null){
    const parsedToDos=JSON.parse(savedTodos);
    toDos=parsedToDos;
    parsedToDos.forEach(paintToDo);}
