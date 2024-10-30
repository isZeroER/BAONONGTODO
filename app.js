let tasks = [];

// 从 localStorage 加载任务
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  renderTasks();
}

// 保存任务到 localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 添加任务
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
    date: new Date().toLocaleDateString() // 获取当前日期
  };

  tasks.push(newTask);
  taskInput.value = '';
  saveTasks(); // 保存任务到 localStorage
  renderTasks();
}

// 删除任务
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks(); // 保存更新后的任务
  renderTasks();
}

// 切换任务完成状态
function toggleTask(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks(); // 保存更新后的任务
  renderTasks();
}

// 渲染任务列表
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.className = `task-item ${task.completed ? 'completed' : ''}`;

    const taskSpan = document.createElement('span');
    taskSpan.textContent = `${task.text} (${task.date})`; // 显示任务和日期
    taskSpan.onclick = () => toggleTask(task.id);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '删除';
    deleteButton.onclick = () => deleteTask(task.id);

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
}

// 页面加载时获取任务
window.onload = loadTasks;
