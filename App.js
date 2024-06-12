import React, { useState, useEffect } from 'react';
import './App.css';
import TaskItem from './TaskItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    console.log("Fetching tasks from local storage...");
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    setPriority(localStorage.getItem('priority') || 'medium');
  }, []);
  

  useEffect(() => {
    console.log("Saving tasks to local storage...");
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    console.log("Saving priority to local storage...");
    localStorage.setItem('priority', priority);
  }, [priority]);
  

  const addTask = () => {
    if (newTask.trim() === '') return;
    const updatedTasks = [...tasks, { text: newTask, completed: false, priority }];
    setTasks(updatedTasks);
    setNewTask('');
  };

  const toggleTaskCompletion = index => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = index => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const clearCompleted = () => {
    const updatedTasks = tasks.filter(task => !task.completed);
    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>React To-Do List</h1>
      <input 
        type="text" 
        value={newTask} 
        onChange={e => setNewTask(e.target.value)} 
        onKeyDown={e => (e.key === 'Enter' ? addTask() : null)} 
        placeholder="Enter a new task" 
      />
      <select id = "abc" value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button id = "abc" onClick={addTask}>Add Task</button>
      <button id = "abc" onClick={clearCompleted}>Clear Completed</button>
      <TransitionGroup component="ul">
        {tasks.map((task, index) => (
          <CSSTransition key={index} timeout={300} classNames="fade">
            <TaskItem 
              task={task} 
              index={index} 
              toggleTaskCompletion={toggleTaskCompletion} 
              deleteTask={deleteTask} 
              editTask={editTask} 
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default App;
