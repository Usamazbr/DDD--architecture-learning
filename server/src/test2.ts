class Todo {
    private constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly description: string,
        public readonly completed: boolean
    ) { }

    static create(
        id: number,
        title: string,
        description: string,
        completed = false
    ): Todo {
        return new Todo(id, title, description, completed);
    }
}

class TodoList {
    private readonly todos: Todo[] = [];

    addTodo(
        title: string,
        description: string,
        completed = false
    ): Todo {
        const id = this.todos.length + 1;
        const todo = Todo.create(id, title, description, completed);
        this.todos.push(todo);
        return todo;
    }

    getTodos(): Todo[] {
        return this.todos;
    }

    getTodoById(id: number): Todo | undefined {
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
