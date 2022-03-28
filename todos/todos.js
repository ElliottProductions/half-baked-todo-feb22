import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async(e) => {
    // on submit, create a todo, reset the form, and display the todos
    e.preventDefault();
    const data = new FormData(todoForm);
    await createTodo(data.get('todo'));
    //console.log(data.get('todo'));
    await displayTodos();
});

async function displayTodos() {
    todosEl.textContent = '';
    // fetch the todos
    const currentTodos = await getTodos();
    //console.log(currentTodos);
    // display the list of todos
    for (let todo of currentTodos){
        const newTodoEl = renderTodo(todo);

        if (todo.complete){
            newTodoEl.classList.add('complete');
        } else {
            newTodoEl.addEventListener('click', async ()=>{
                completeTodo(todo.id);
                displayTodos();
            });
        }
        

        todosEl.append(newTodoEl);
    }
    // be sure to give each todo an event listener

    // on click, complete that todo
}

// add an on load listener that fetches and displays todos on load

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();
    displayTodos();
    // then refetch and display the updated list of todos
});
