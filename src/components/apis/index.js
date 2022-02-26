const todoAppApi = 'https://json-server-todo-app-2.herokuapp.com/todoapp';

export const getTodoList = async () => {
    try {
        const response  = await fetch(todoAppApi);
        const todoList = await response.json();
        return todoList;
    } catch (error) {
        console.log("Lỗi không gọi được api: ",error);
    }
};

export const addNewTodo = async (data = {}) => {
    try {
        const response  = await fetch(todoAppApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const newTodo = await response.json();
        return newTodo;
    } catch (error) {
        console.log("Lỗi không gọi được api: ",error);
    }
};

export const editNameTodo = async (data={}) => {
    try {
        const response  = await fetch(todoAppApi+'/'+data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const todo = await response.json();
        return todo;
    } catch (error) {
        console.log("Lỗi không gọi được api: ",error);
    }
};

export const editCheckTodo = async (data={}) => {
    try {
        const response  = await fetch(todoAppApi+'/'+data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const todo = await response.json();
        return todo;
    } catch (error) {
        console.log("Lỗi không gọi được api: ",error);
    }
};

export const removeTodo = async (data={}) => {
    try {
        const response  = await fetch(todoAppApi+'/'+data.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const todo = await response.json();
        return todo;
    } catch (error) {
        console.log("Lỗi không gọi được api: ",error);
    }
};