class Todo {
    id;
    title;
    description;
    completed;
    constructor(id, title, description, completed) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }
    static create(id, title, description, completed = false) {
        return new Todo(id, title, description, completed);
    }
}
class TodoList {
    todos = [];
    addTodo(title, description, completed = false) {
        const id = this.todos.length + 1;
        const todo = Todo.create(id, title, description, completed);
        this.todos.push(todo);
        return todo;
    }
    getTodos() {
        return this.todos;
    }
    getTodoById(id) {
        return this.todos.find((todo) => todo.id === id);
    }
}
// Example usage:
const todoList = new TodoList();
// Add a new todo to the list
const todo1 = todoList.addTodo('Buy groceries', 'Milk, bread, eggs');
console.log(todo1);
// Get all todos from the list
const todos = todoList.getTodos();
console.log(todos);
// Get a todo by ID
const todo2 = todoList.getTodoById(1);
console.log(todo2);
export {};
