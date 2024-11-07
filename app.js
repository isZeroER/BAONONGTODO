const filePath = 'tasks.json'; // JSON 文件路径
const photosFolderPath = 'photos/'; // 照片文件夹路径

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
        monthItem.textContent = month;
        monthItem.onclick = () => renderTasks(data, month);

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
        dateElement.textContent = task.date;

        const textElement = document.createElement('div');
        textElement.innerHTML = task.text.replace(/\n/g, '<br>');

        taskItem.appendChild(dateElement);
        taskItem.appendChild(textElement);
        taskList.appendChild(taskItem);
    });

    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.textContent = '返回月份';
    backButton.onclick = () => renderMonths(data);
    taskList.appendChild(backButton);
}

// 加载照片背景
async function loadPhotoBackground() {
    const photoBackground = document.getElementById('photoBackground');
    
    for (let i = 1; i <= 5; i++) { // 假设有5张照片，命名为1.jpg, 2.jpg, etc.
        const photoDiv = document.createElement('div');
        photoDiv.className = 'background-photo';
        photoDiv.style.backgroundImage = `url('${photosFolderPath}${i}.jpg')`;
        photoBackground.appendChild(photoDiv);
    }
}

// 页面加载时获取任务和背景图片
window.onload = () => {
    loadTasks();
    loadPhotoBackground();
};
