import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

const TaskList = () => {
    const { tasks, loading, error, filter, setFilter, updateTask, deleteTask } = useTasks();
    const navigate = useNavigate();

    const handleStatusChange = async (id, currentStatus) => {
        await updateTask(id, { status: currentStatus === 'complete' ? 'incomplete' : 'complete' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await deleteTask(id);
        }
    };

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="task-list-container">
            <div className="task-list-header">
                <h2>My Tasks</h2>
                <button onClick={() => navigate('/add')} className="add-button">
                    Add New Task
                </button>
            </div>
            
            <div className="filter-buttons">
                <button
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button
                    className={filter === 'incomplete' ? 'active' : ''}
                    onClick={() => setFilter('incomplete')}
                >
                    Active
                </button>
                <button
                    className={filter === 'complete' ? 'active' : ''}
                    onClick={() => setFilter('complete')}
                >
                    Completed
                </button>
            </div>

            {tasks.length === 0 ? (
                <div className="no-tasks">No tasks found</div>
            ) : (
                <div className="tasks-grid">
                    {tasks.map(task => (
                        <div key={task._id} className={`task-card ${task.status}`}>
                            <div className="task-header">
                                <h3>{task.title}</h3>
                                <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                                    {task.priority}
                                </span>
                            </div>
                            <p className="task-description">{task.description}</p>
                            <div className="task-footer">
                                <button
                                    onClick={() => handleStatusChange(task._id, task.status)}
                                    className={`status-button ${task.status}`}
                                >
                                    {task.status === 'complete' ? 'Mark Incomplete' : 'Mark Complete'}
                                </button>
                                <button
                                    onClick={() => handleDelete(task._id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList; 