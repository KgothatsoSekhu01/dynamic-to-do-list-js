document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize tasks array
    let tasks = [];

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        // Check if taskText is defined
        if (taskText === undefined || taskText.trim() === "") return;

        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign onclick event to remove button
        removeButton.onclick = () => {
            taskList.removeChild(listItem);
            // Remove task from array and update Local Storage
            tasks = tasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Update tasks array and save to Local Storage
        if (save) {
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Attach event listener to add button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    // Allow adding tasks by pressing the "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
