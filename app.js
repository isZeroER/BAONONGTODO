const filePath = 'tasks.json'; // JSON 文件路径

// 从本地加载任务
async function loadTasks() {
    const response = await fetch(filePath);

    if (response.ok) {
        const tasks = await response.json();
        renderTasks(tasks);
    } else {
        console.error('无法加载任务:', response.statusText);
    }
}

// 渲染任务列表
function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.textContent = `${task.date}:\n${task.text}`; // 显示日期和任务
        taskList.appendChild(taskItem);
    });
}

// 页面加载时获取任务
window.onload = loadTasks;
