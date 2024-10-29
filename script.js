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
            todoInput.value = getTodoItems(selectedDate).join('\n');
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
        localStorage.setItem(selectedDate, JSON.stringify(items));
        loadDateList();
        todoModal.style.display = 'none';
    });

    // 添加今天的 TODO List
    document.getElementById('addDateButton').addEventListener('click', () => {
        const today = new Date().toLocaleDateString();
        if (!localStorage.getItem(today)) {
            localStorage.setItem(today, JSON.stringify([]));
            loadDateList();
        }
    });

    // 加载日期列表
    function loadDateList() {
        dateListElement.innerHTML = '';
        for (const key in localStorage) {
            const dateItem = document.createElement('div');
            dateItem.classList.add('date-item');
            dateItem.dataset.date = key;
            dateItem.innerText = key;
            dateListElement.appendChild(dateItem);
        }
    }

    // 获取 TODO 项目
    function getTodoItems(date) {
        return JSON.parse(localStorage.getItem(date)) || [];
    }
});
