import { useEffect, useState } from 'react'
import { TodoForm, TodoItem } from './components/index'
import { TodoProvider } from './context/ToDoContext';

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prevValue) => {
      return [{
        id: Date.now(),
        ...todo
      }, ...prevValue]
    });
  };
  const updateTodo = (id, todo) => {
    setTodos((prevValue) => {
      return prevValue.map((prevTodo) => {
        return (prevTodo.id === id) ? { ...prevTodo, todo: todo } : prevTodo;
      });
    });
  };

  const deleteTodo = (id) => {
    setTodos((prevValue) => {
      return prevValue.filter((prevTodo) => {
        return prevTodo.id !== id
      });
    });
  };

  const toggleComplete = (id) => {
    setTodos((prevValue) => {
      return prevValue.map((prevTodo) => {
        return (prevTodo.id === id) ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo;
      });
    });
  };

  useEffect(() => {
    // local storage are web browser's storage. It has two functions only get and set. 
    const todos = JSON.parse(localStorage.getItem("todos"));    //we have to provide key.
    if (todos && todos.length) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));   // we have to provide both key and value in string.
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id}
                className='w-full'
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
