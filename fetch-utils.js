const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6YmFwaWd1YmJzd2tobXBrbW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc4Nzk0NTMsImV4cCI6MTk2MzQ1NTQ1M30.4fqkZViMQGidqxI8xltReNok9umY5rBiZ0lrBWSVBks'

const SUPABASE_URL = "https://gzbapigubbswkhmpkmou.supabase.co"

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createTodo(todo) {
    // create a single incomplete todo with the correct 'todo' property for this user in supabase

    return checkError(response);
}

export async function deleteAllTodos() {
    // delete all todos for this user in supabase

    return checkError(response);
}

export async function getTodos() {
    // get all todos for this user from supabase

    return checkError(response);
}

export async function completeTodo(id) {
    // find the and update (set complete to true), the todo that matches the correct id

    return checkError(response);
}

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./todos');
    }
}

export function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
