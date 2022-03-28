export function renderTodo(todo) {
    // create a div and a p tag
    // depending on whether the todo is complete, give the div the appropriate css class ('complete' or 'incomplete')
    const newTodo = document.createElement('div');
    const newTodoText = document.createElement('p');
    // add the 'todo' css class no matter what
    newTodo.classList.add('todo');
    // put the todo's text into the p tag
    newTodoText.textContent = todo.todo;
    // append stuff
    newTodo.append(newTodoText);
    // return the div
    return newTodo;
}