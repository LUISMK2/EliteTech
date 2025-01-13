import React, { useState } from 'react';
import { 
  ListTodo, 
  Plus, 
  Check, 
  X, 
  Edit2, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  Circle 
} from 'lucide-react';

type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date(),
      },
    ]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            completedAt: !task.completed ? new Date() : undefined 
          }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id: string) => {
    if (!editText.trim()) return;
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editText.trim() } : task
    ));
    setEditingTask(null);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const TaskList = ({ tasks, title }: { tasks: Task[], title: string }) => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
        {title === 'Pending Tasks' ? <Circle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5 text-green-500" />}
        {title}
        <span className="text-sm font-normal text-gray-500">({tasks.length})</span>
      </h2>
      <div className="space-y-2">
        {tasks.map(task => (
          <div 
            key={task.id}
            className={`p-4 rounded-lg border ${
              task.completed 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-white border-gray-200 hover:border-indigo-300'
            } transition-all duration-200`}
          >
            {editingTask === task.id ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 
                  focus:border-indigo-500 transition-all duration-200"
                  autoFocus
                />
                <button
                  onClick={() => saveEdit(task.id)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setEditingTask(null)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    task.completed 
                      ? 'text-green-600 hover:bg-green-50' 
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                </button>
                <div className="flex-1">
                  <p className={`${task.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                    {task.text}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Created: {formatDate(task.createdAt)}</span>
                    {task.completedAt && (
                      <>
                        <span>•</span>
                        <span>Completed: {formatDate(task.completedAt)}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  {!task.completed && (
                    <button
                      onClick={() => startEditing(task)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <ListTodo className="w-8 h-8 text-indigo-500" />
            <h1 className="text-2xl font-bold text-gray-800">Todo App</h1>
          </div>

          <form onSubmit={addTask} className="flex gap-2 mb-8">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 
              focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-semibold
              hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-200 transition-all 
              duration-200 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </form>

          <div className="space-y-8">
            {pendingTasks.length > 0 && (
              <TaskList tasks={pendingTasks} title="Pending Tasks" />
            )}
            {completedTasks.length > 0 && (
              <TaskList tasks={completedTasks} title="Completed Tasks" />
            )}
            {tasks.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No tasks yet. Add your first task above!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;