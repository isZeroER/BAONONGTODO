const filePath = 'tasks.json'; // JSON 文件路径

// 从本地加载任务
async function loadTasks() {
    const response = await fetch(filePath);

    if (response.ok) {
        const data = await response.json();
        renderMonths(data);
    } else {
        console.error('无法加载任务:', response.statusText);
    }
}

// 渲染月份列表
function renderMonths(data) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    Object.keys(data).forEach(month => {
        const monthItem = document.createElement('div');
        monthItem.className = 'month-item';
        monthItem.textContent = month; // 显示月份
        monthItem.onclick = () => renderTasks(data, month); // 点击显示该月任务

        taskList.appendChild(monthItem);
    });
}

// 渲染具体日期任务
function renderTasks(data, month) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    data[month].forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';

        const dateElement = document.createElement('div');
        dateElement.className = 'date';
        dateElement.textContent = task.date; // 显示日期

        const textElement = document.createElement('div');
        textElement.innerHTML = task.text.replace(/\n/g, '<br>'); // 换行符替换为 <br>

        taskItem.appendChild(dateElement);
        taskItem.appendChild(textElement);
        taskList.appendChild(taskItem);
    });

    // 添加“返回”按钮以返回月份视图
    const backButton = document.createElement('button');
    backButton.className = 'back-button'; // 添加类名
    backButton.textContent = '返回月份';
    backButton.onclick = () => renderMonths(data);
    taskList.appendChild(backButton);
}

// 页面加载时获取任务
window.onload = loadTasks;
