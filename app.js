// --- NAVIGASI RESPONSIF ---
function showSection(id) {
    document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-links li').forEach(l => l.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (id === 'history') loadHistory();
}

// --- FITUR DAILY PLANS ---
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value) return;
    tasks.push({ text: input.value, completed: false });
    input.value = '';
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    let doneCount = 0;

    tasks.forEach((task, i) => {
        if (task.completed) doneCount++;
        list.innerHTML += `
            <li class="task-item ${task.completed ? 'completed' : ''}">
                <span onclick="toggleTask(${i})">${task.text}</span>
                <button onclick="deleteTask(${i})" style="color:red; background:none; border:none; cursor:pointer">Delete</button>
            </li>`;
    });
    
    // Update Diagram Produktivitas
    const progress = tasks.length > 0 ? (doneCount / tasks.length) * 100 : 0;
    document.getElementById('progressFill').style.width = progress + '%';
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// --- FITUR DIARY & EDITOR ---
function execCmd(command, value = null) {
    document.execCommand(command, false, value);
}

function handleImage(input) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = `<img src="${e.target.result}" />`;
        document.getElementById('diaryEditor').innerHTML += img;
    };
    reader.readAsDataURL(input.files[0]);
}

function saveDiary() {
    const content = document.getElementById('diaryEditor').innerHTML;
    const history = JSON.parse(localStorage.getItem('full_history')) || [];
    history.push({
        date: new Date().toLocaleString(),
        type: 'Diary Reflection',
        data: content
    });
    localStorage.setItem('full_history', JSON.stringify(history));
    alert('Data tersimpan ke History!');
}

// --- FITUR FINANCE ---
let financeData = JSON.parse(localStorage.getItem('finance')) || [];

function addFinance() {
    const note = document.getElementById('finNote').value;
    const amount = document.getElementById('finAmount').value;
    if (!note || !amount) return;

    financeData.push({ note, amount: parseInt(amount) });
    localStorage.setItem('finance', JSON.stringify(financeData));
    renderFinance();
}

function renderFinance() {
    const list = document.getElementById('financeList');
    let total = 0;
    list.innerHTML = '';
    financeData.forEach(item => {
        total += item.amount;
        list.innerHTML += `<div class="task-item"><span>${item.note}</span> <b>Rp ${item.amount}</b></div>`;
    });
    document.getElementById('totalAmount').innerText = total.toLocaleString();
}

// --- FITUR HISTORY (Social Media Style View) ---
function loadHistory() {
    const container = document.getElementById('historyContainer');
    const history = JSON.parse(localStorage.getItem('full_history')) || [];
    container.innerHTML = history.length ? '' : '<p>Belum ada data tersimpan.</p>';
    
    history.reverse().forEach(item => {
        container.innerHTML += `
            <div class="card" style="margin-bottom: 20px;">
                <small style="color:gray">${item.date}</small>
                <h3 class="serif">${item.type}</h3>
                <div style="margin-top:10px">${item.data}</div>
            </div>`;
    });
}

// Load awal
window.onload = () => {
    renderTasks();
    renderFinance();
};
