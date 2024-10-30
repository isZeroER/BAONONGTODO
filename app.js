const repoOwner = 'isZeroER'; // 替换为你的GitHub用户名
const repoName = 'BAONONGTODO'; // 替换为你的仓库名
const filePath = 'tasks.json'; // JSON 文件路径

// 从 GitHub 加载任务
async function loadTasks() {
    const response = await fetch(`https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${filePath}`);

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
        const listItem = document.createElement('li');
        listItem.className = 'task-item';
        listItem.textContent = `${task.text} (${task.date})`; // 显示任务和日期
        taskList.appendChild(listItem);
    });
}

// 页面加载时获取任务
window.onload = loadTasks;
