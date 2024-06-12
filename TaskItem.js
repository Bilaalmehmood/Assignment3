import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames'; 

function TaskItem({ task, index, toggleTaskCompletion, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing && editText.trim() !== '') {
      editTask(index, editText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={classnames({ 'completed': task.completed })}>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => toggleTaskCompletion(index)} 
      />
      {isEditing ? (
        <input 
          type="text" 
          value={editText} 
          onChange={e => setEditText(e.target.value)} 
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>{task.text}</span>
      )}
      <span  className={`priority ${task.priority}`}>{task.priority}</span>
      <button id = "abc" onClick={() => deleteTask(index)}>Delete</button>
    </li>
  );
}

export default TaskItem;
