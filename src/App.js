import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // 獲取任務資料
    axios.get('http://localhost:5000/tasks').then(response => {
      setTasks(response.data);
    });
  }, []);

  const addTask = () => {
    // 創建新任務
    axios.post('http://localhost:5000/tasks', { title, description }).then(response => {
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
    });
  };

  const completeTask = id => {
    // 完成任務
    axios.put(`http://localhost:5000/tasks/${id}`, { status: 'completed' }).then(() => {
      setTasks(tasks.map(task => task.id === id ? { ...task, status: 'completed' } : task));
    });
  };

  const deleteTask = id => {
    // 刪除任務
    axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
      setTasks(tasks.filter(task => task.id !== id));
    });
  };

  return (
    <div>
      <h1>待辦事項管理系統</h1>
      <div>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="任務標題" />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="任務描述" />
        <button onClick={addTask}>新增任務</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.status}</p>
            {task.status === 'pending' && <button onClick={() => completeTask(task.id)}>完成任務</button>}
            <button onClick={() => deleteTask(task.id)}>刪除任務</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
