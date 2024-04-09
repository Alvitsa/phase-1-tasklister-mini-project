document.addEventListener("DOMContentLoaded", () => {
  const createTaskForm = document.getElementById('create-task-form');
  const tasksList = document.getElementById('tasks');

  createTaskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newTaskDescription = document.getElementById('new-task-description').value;
    const taskPriority = document.getElementById('task-priority').value;
    const userInfo = document.getElementById('user-info').value; // Added for user info input

    if (newTaskDescription) {
      const newTask = document.createElement('li');
      newTask.textContent = `${userInfo}: ${newTaskDescription}`; // Display user info along with task description
      newTask.style.color = getPriorityColor(taskPriority);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = function() {
        tasksList.removeChild(newTask);
      };

      const editButton = document.createElement('button'); // Added for edit functionality
      editButton.textContent = 'Edit';
      editButton.onclick = function() {
        const editedTask = prompt('Edit task:', newTask.textContent);
        if (editedTask !== null) {
          newTask.textContent = editedTask;
        }
      };

      newTask.appendChild(deleteButton);
      newTask.appendChild(editButton); // Append edit button to the task item

      tasksList.appendChild(newTask);
      createTaskForm.reset();
    }
  });

  function getPriorityColor(priority) {
    const priorityColors = {
      'High': 'red',
      'Medium': 'yellow',
      'Low': 'green'
    };
    return priorityColors[priority] || 'black';
  }

  // Sorting functionality based on priority
  const sortSelect = document.getElementById('sort-select');
  sortSelect.addEventListener('change', function() {
    const sortOrder = sortSelect.value;
    const tasks = Array.from(tasksList.children);

    tasks.sort((a, b) => {
      const priorityA = a.textContent.split(': ')[1];
      const priorityB = b.textContent.split(': ')[1];

      if (sortOrder === 'ascending') {
        return priorityA.localeCompare(priorityB);
      } else if (sortOrder === 'descending') {
        return priorityB.localeCompare(priorityA);
      }
    });

    tasksList.innerHTML = '';
    tasks.forEach(task => tasksList.appendChild(task));
  });
});