const repoOwner = 'isZeroER'; // 替换为你的 GitHub 用户名
const repoName = 'BAONONGTODO'; // 替换为你的仓库名称
const personalAccessToken = process.env.GITHUB_TOKEN; // 使用环境变量


document.addEventListener('DOMContentLoaded', () => {
    const dateListElement = document.getElementById('dateList');
    const todoModal = document.getElementById('todoModal');
    const modalDate = document.getElementById('modalDate');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const saveButton = document.getElementById('saveButton');
    const closeButton = document.querySelector('.close');

    // 加载日期和 TODO List
    loadDateList();

    // 点击日期，打开 TODO Modal
    dateListElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('date-item')) {
            const selectedDate = event.target.dataset.date;
            modalDate.innerText = selectedDate;
            fetchTodoItems(selectedDate);
            todoModal.style.display = 'block';
        }
    });

    // 关闭模态框
    closeButton.onclick = () => {
        todoModal.style.display = 'none';
    };

    // 保存 TODO
    saveButton.addEventListener('click', () => {
        const selectedDate = modalDate.innerText;
        const items = todoInput.value.split('\n').filter(item => item.trim() !== '');
        saveTodoItems(selectedDate, items);
        loadDateList();
        todoModal.style.display = 'none';
    });

    // 添加今天的 TODO List
    document.getElementById('addDateButton').addEventListener('click', () => {
        const today = new Date().toLocaleDateString();
        loadDateList();
    });

    // 加载日期列表
    function loadDateList() {
        const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/todos`;
        fetch(url, {
            headers: {
                'Authorization': `token ${personalAccessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            dateListElement.innerHTML = '';
            data.forEach(file => {
                const dateItem = document.createElement('div');
                dateItem.classList.add('date-item');
                dateItem.dataset.date = file.name.replace('.json', '');
                dateItem.innerText = dateItem.dataset.date;
                dateListElement.appendChild(dateItem);
            });
        });
    }

    // 获取 TODO 项目
    function fetchTodoItems(date) {
        const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/todos/${date}.json`;
        fetch(url, {
            headers: {
                'Authorization': `token ${personalAccessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const decodedContent = atob(data.content);
            todoInput.value = decodedContent.split('\n').filter(item => item).join('\n');
        });
    }

    // 保存 TODO 项目
    function saveTodoItems(date, items) {
        const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/todos/${date}.json`;
        const content = items.join('\n');
        const encodedContent = btoa(content);
        const data = {
            message: `Update ${date} TODOs`,
            content: encodedContent
        };

        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${personalAccessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
});
