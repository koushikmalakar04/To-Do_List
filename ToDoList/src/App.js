import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState('General');
  const [taskDate, setTaskDate] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskTitle.trim() !== '') {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        category: taskCategory,
        Date: taskDate,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
      setTaskCategory('General');
      setTaskDate('');
    }
  };

  const markAsCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1 className="app-title">To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a task"
          className="task-input"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <select
          value={taskCategory}
          className="category-select"
          onChange={(e) => setTaskCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <input
          type="date"
          placeholder="Date"
          className="date-input"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />
        <button onClick={addTask} className="add-button">
          Add Task
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span onClick={() => markAsCompleted(task.id)} className="task-title">
              {task.title}
            </span>
            <span className="task-category">Category: {task.category}</span>
            {task.Date && <span className="task-date">Date: {task.Date}</span>}
            <button onClick={() => deleteTask(task.id)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
