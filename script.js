
/**
 * Implement welcome screen where user can insert their username and choose the character
 */
const usernameInput = document.getElementById("username");
const characterSelect = document.getElementById("char-select");
const startButton = document.getElementById("start-btn");
const wrapper = document.querySelector(".wrapper");
const backBtn = document.querySelector(".back-btn");
const previewImg = document.getElementById("preview-img");


document.addEventListener('DOMContentLoaded', function() {
    if (characterSelect.options.length > 0) {
        previewImg.src = characterSelect.options[0].value;
        previewImg.style.display = 'block';
    }
    
    characterSelect.addEventListener('change', function() {
        previewImg.src = this.value;
        
        // Add animation
        const preview = document.querySelector(".char-preview");
        preview.style.transform = 'scale(1.1)';
        setTimeout(() => {
            preview.style.transform = 'scale(1)';
        }, 200);
    });
});

startButton.addEventListener('click', function () {
    const username = usernameInput.value.trim();
    const character = characterSelect.value;

    if (!username) {
        alert('Please enter your name!');
        return; 
    }

    localStorage.setItem('username', username);
    localStorage.setItem('character', character);

    showHomeScreen(username, character);
});

function showHomeScreen(username, character) {
    // Hide the Welcome Screen
    const welcomeScreen = document.querySelector(".welcome-screen");
    welcomeScreen.style.display = 'none';

    // Show the Home Screen
    const homeScreen = document.querySelector(".home-screen");
    homeScreen.style.display = 'block';

    const usernamePlaceholder = document.getElementById("username-placeholder");
    usernamePlaceholder.textContent = username;

    const characterImage = document.getElementById("character-image");
    characterImage.src = character;
}

window.addEventListener('load', function() {
    const savedUsername = localStorage.getItem('username');
    const savedCharacter = localStorage.getItem('character');
    
    if (savedUsername && savedCharacter) {
        showHomeScreen(savedUsername, savedCharacter);
    }
    getData();
    renderCategories();
    calculateTotal();
});

function toggleScreen() {
    wrapper.classList.toggle("show-category");
};
backBtn.addEventListener("click", toggleScreen);


const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task");

function toggleAddTaskForm() {
    addTaskForm.classList.toggle("active");
    addTaskBtn.classList.toggle("active");
}

// Add event listeners with proper checks
if (addTaskBtn && addTaskForm) {
    addTaskBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling
        toggleAddTaskForm();
    });
}

//add categories and tasks
let categories =  [
    {
        title: "Personal",
        img: "Cat.png",
    },
    {
        title: "Work",
        img: "catWorking.png",
    },
    {
        title: "Gym",
        img: "gym.png",
    },
    {
        title: "Relax",
        img: "Relax.png",
    },
    {
        title: "Sleep",
        img: "Sleep.png",
    },
    {
        title: "Shopping",
        img: "shopping.png",
    }
];
let tasks = [
    {
        id: 1,
        task: "Go Shopping",
        category: "Shopping",
        completed: false,
    },
    {
        id: 2,
        task: "Finish Project",
        category: "Work",
        completed: false,
    },
    {
        id: 3,
        task: "Take a break",
        category: "Relax",
        completed: false,
    },
    {
        id: 4,
        task: "Legs Day",
        category: "Gym",
        completed: false,
    },
    {
        id: 5,
        task: "Go to bed",
        category: "Sleep",
        completed: false,
    },
    {
        id: 6,
        task: "Read Book",
        category: "Relax",
        completed: false,
    },
];

let selectedCategory = categories[0];
const categoriesContainer = document.querySelector(".categories");
const categoryTitle = document.querySelector(".category-title");
const totalCategoryTasks = document.querySelector(".category-tasks");
const categoriesImg = document.querySelector("#category-img");
const totalTasks = document.querySelector(".totalTasks");

function calculateTotal() {
    const categoryTasks = tasks.filter((task) => 
        task.category.toLowerCase() === selectedCategory.title.toLowerCase()
    );
    totalCategoryTasks.innerHTML = `${categoryTasks.length} Task(s)`;
    totalTasks.innerHTML = tasks.length;
}; 

function renderCategories() {
    categoriesContainer.innerHTML = "";
    categories.forEach((category) => {
        const categoryTasks = tasks.filter((task) => {
            return task.category.toLowerCase() === category.title.toLowerCase();
        });
        //create a div to render category
        const div = document.createElement("div");
        div.classList.add("category");
        div.addEventListener("click", () => {
            wrapper.classList.add("show-category");
            selectedCategory = category;
            console.log(selectedCategory);
            categoryTitle.innerHTML = category.title;
            categoriesImg.src = `image/${category.img}`;
            calculateTotal();
            renderTasks();
            document.querySelector(".menu-dropdown").classList.remove("active");
        });
        div.innerHTML = `<div class="left">
                                <img src="image/${category.img}" alt="${category.title}">
                                <div class="content">
                                    <h1>${category.title}</h1>
                                    <p>${categoryTasks.length} Tasks</p>
                                </div>
                            </div>
                            <div class="options">
                                <div class="toggle-btn">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                   >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                    />  
                                   </svg>
                                </div>
                            </div>`;
        categoriesContainer.appendChild(div);
    });
};

const tasksContainer = document.querySelector(".tasks");
function renderTasks() {
    tasksContainer.innerHTML = "";
    const categoryTasks = tasks.filter((task) => {
        return task.category.toLowerCase() === selectedCategory.title.toLowerCase();
    });
    if (categoryTasks.length === 0) {
        tasksContainer.innerHTML = `
        <p class="no-task">No task for this category</p>
        `;
    }else {
        categoryTasks.forEach((task) => {
            const div = document.createElement("div");
            div.classList.add("task-wrapper");
            const label = document.createElement("label");
            label.classList.add("task");
            label.setAttribute("for", task.id);
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = task.id;
            checkbox.checked = task.completed;
            //add completion functionality on click checkbox
            checkbox.addEventListener("change", () => {
                const index = tasks.findIndex((t) => t.id === task.id);
                tasks[index].completed = !tasks[index].completed;
                saveData();
            });
            div.innerHTML = `<div class="delete">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                    >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.2442.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.092.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </div>`;
            label.innerHTML = `<span class="checkmark">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                    >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                                </span>
                                <p>${task.task}</p>`;
            label.prepend(checkbox);
            div.prepend(label);
            tasksContainer.appendChild(div);
            //delete function
            const deleteBtn = document.querySelector(".delete");
            deleteBtn.addEventListener("click", () => {
                const index = tasks.findIndex((t) => t.id === task.id);
                tasks.splice(index, 1);
                saveData();
                renderTasks();
            })
        });
        renderCategories();
        calculateTotal();
    }   
};

//save and get tasks from local storage
function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
function getData() {
    const localTasks = JSON.parse(localStorage.getItem("tasks"));
    if (localTasks) {
        tasks = localTasks;
    }
};

//render all categories in select
const categorySelect = document.querySelector("#category-select");
const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");
const taskInput = document.querySelector("#task-input");

cancelBtn.addEventListener("click", toggleAddTaskForm);

addBtn.addEventListener("click", () => {
    const task = taskInput.value;
    const category = categorySelect.value;
    if (task === "") {
        alert("Please Enter a Task!");
    } else {
        const newTask = {
            id: tasks.length+1,
            task,
            category,
            completed: false,
        };
        tasks.push(newTask);
        taskInput.value=""
        saveData();
        toggleAddTaskForm();
        renderTasks();
    }
});

categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.title.toLowerCase();
    option.textContent = category.title;
    categorySelect.appendChild(option);
});

// Profile Modal Elements
const profileModal = document.querySelector(".profile-modal");
const menuBtn = document.querySelector(".menu-btn"); 
const menuDropdown = document.querySelector(".menu-dropdown");
const saveBtn = document.querySelector('.save-btn');
const cancelProfileBtn = document.querySelector('.cancel-menu-btn');

// Open Profile Modal
if (menuBtn && menuDropdown) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        if (!wrapper.classList.contains("show-category")) {
            menuDropdown.classList.toggle("active");
        }
    });
}

document.addEventListener('click', (e) => {
    if (e.target !== menuBtn && !menuBtn.contains(e.target)) {
        menuDropdown.classList.remove('active');
    }
});

const openProfileBtn = document.getElementById('open-profile-btn');
if (openProfileBtn) {
  openProfileBtn.addEventListener('click', () => {
    if (profileModal) {
      profileModal.classList.add('active');
      menuDropdown.classList.remove('active');
      document.getElementById('new-username').value = localStorage.getItem('username') || '';
    }
  });
}

// Close Profile Modal
cancelProfileBtn.addEventListener('click', () => profileModal.classList.remove('active'));

profileModal.addEventListener('click', (e) => {
  if (e.target === profileModal) profileModal.classList.remove('active');
});

saveBtn.addEventListener('click', () => {
    const newUsername = document.getElementById('new-username').value.trim();
    const selectedAvatar = document.querySelector('.character-option.selected')?.dataset.avatar || localStorage.getItem('character');
  
    if (newUsername) {
      localStorage.setItem('username', newUsername);
      localStorage.setItem('character', selectedAvatar);
      
      // Update UI
      document.getElementById('username-placeholder').textContent = newUsername;
      if (selectedAvatar) {
        document.getElementById('character-image').src = `image/${selectedAvatar}`;
      }
      
      profileModal.classList.remove('active');
    } else {
      alert("Username cannot be empty!");
    }
});
  
  // Avatar Selection Logic
document.querySelectorAll('.character-option').forEach(avatar => {
    avatar.addEventListener('click', () => {
      document.querySelectorAll('.character-option').forEach(a => a.classList.remove('selected'));
      avatar.classList.add('selected');
    });
});

getData();
calculateTotal();
renderCategories();
renderTasks();