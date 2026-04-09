// Tab Switching Logic
const navLinks = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('.tab-content');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const target = link.getAttribute('data-target');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Show correct section
        sections.forEach(section => {
            section.classList.remove('active');
            if(section.id === target) section.classList.add('active');
        });
    });
});

// Daily Date
document.getElementById('currentDate').innerText = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', month: 'long', day: 'numeric' 
});

// LocalStorage Saving Logic
function saveDiary() {
    const entry = document.getElementById('diaryEntry').value;
    localStorage.setItem('daily_diary', entry);
    alert('Reflection saved locally.');
}

// Load data when page opens
window.onload = () => {
    const savedDiary = localStorage.getItem('daily_diary');
    if(savedDiary) document.getElementById('diaryEntry').value = savedDiary;
};
