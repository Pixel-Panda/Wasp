import React, { useState } from 'react';
import { useQuery, useAction, getUserTasks, createTask, updateTask } from 'wasp/client/operations';

const MainPage = () => {
  const { data: tasks, isLoading, error } = useQuery(getUserTasks);
  const createTaskFn = useAction(createTask);
  const updateTaskFn = useAction(updateTask);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingDescription, setEditingDescription] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateTask = () => {
    createTaskFn({ description: newTaskDescription });
    setNewTaskDescription('');
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditingDescription(task.description);
  };

  const handleUpdateTask = () => {
    updateTaskFn({ taskId: editingTask.id, description: editingDescription, isDone: editingTask.isDone });
    setEditingTask(null);
    setEditingDescription('');
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Task'
          className='px-1 py-2 border rounded text-lg'
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button
          onClick={handleCreateTask}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Task
        </button>
      </div>
      <div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
          >
            {editingTask && editingTask.id === task.id ? (
              <>
                <input
                  type='text'
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                  className='px-1 py-2 border rounded text-lg mr-2'
                />
                <button
                  onClick={handleUpdateTask}
                  className='bg-green-500 hover:bg-green-700 px-2 py-2 text-white font-bold rounded mr-2'
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTask(null)}
                  className='bg-red-500 hover:bg-red-700 px-2 py-2 text-white font-bold rounded'
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <input
                  type='checkbox'
                  checked={task.isDone}
                  onChange={() => updateTaskFn({ taskId: task.id, description: task.description, isDone: !task.isDone })}
                  className='mr-2 h-6 w-6'
                />
                <p className='flex-grow'>{task.description}</p>
                <button
                  onClick={() => handleEditTask(task)}
                  className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2'
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
