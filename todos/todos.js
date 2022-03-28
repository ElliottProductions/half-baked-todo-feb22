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
const loadSpinner = document.querySelector('.loading');

todoForm.addEventListener('submit', async (e) => {
    // on submit, create a todo, reset the form, and display the todos
    e.preventDefault();
    const data = new FormData(todoForm);
    await createTodo(data.get('todo'));
 
    await displayTodos();

    todoForm.reset();
});

async function displayTodos() {
    todosEl.textContent = '';
    loadSpinner.classList.remove('invisible');
    // fetch the todos
    const currentTodos = await getTodos();
   
    // display the list of todos
    for (let todo of currentTodos){
        const newTodoEl = renderTodo(todo);

        
        if (todo.complete){
            newTodoEl.classList.add('complete');
        } else {
            newTodoEl.addEventListener('click', async ()=>{ 
                await completeTodo(todo.id);
                
                await displayTodos(); 
            });
            
        }
            
        
        

        todosEl.append(newTodoEl);
    }
    // be sure to give each todo an event listener
    loadSpinner.classList.add('invisible');
    // on click, complete that todo
}

// add an on load listener that fetches and displays todos on load
window.addEventListener('load', async ()=>{
    displayTodos();
    loadSpinner.classList.add('invisible');
});

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();
    await displayTodos();
    // then refetch and display the updated list of todos
});
