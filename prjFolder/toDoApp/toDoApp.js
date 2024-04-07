(function () {
    let state = undefined;
    /**
     * Global application state
     * @template T
     * @param {T} initialValue
     * @returns {[T, function(T): void]}
     */
      
    function useState(initialValue) {
        state = state || initialValue;

        function setValue(newValue) {
            state = newValue;
            renderApp();
        }

        return [state, setValue];
    }

    /**
     * Functional component for the list
     * @param items {string[]}
     * @returns {HTMLElement} - List element
     */
    
    function ListItem({ items }) {
        const list = document.createElement("ul");
        list.classList.add("Ul");

        const trashBinIconSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" fill="white" />
        <path d="M7 3H9C9 2.44772 8.55228 2 8 2C7.44772 2 7 2.44772 7 3ZM6 3C6 1.89543 6.89543 1 8 1C9.10457 1 10 1.89543 10 3H14C14.2761 3 14.5 3.22386 14.5 3.5C14.5 3.77614 14.2761 4 14 4H13.4364L12.2313 12.8378C12.0624 14.0765 11.0044 15 9.75422 15H6.24578C4.99561 15 3.93762 14.0765 3.76871 12.8378L2.56355 4H2C1.72386 4 1.5 3.77614 1.5 3.5C1.5 3.22386 1.72386 3 2 3H6ZM7 6.5C7 6.22386 6.77614 6 6.5 6C6.22386 6 6 6.22386 6 6.5V11.5C6 11.7761 6.22386 12 6.5 12C6.77614 12 7 11.7761 7 11.5V6.5ZM9.5 6C9.77614 6 10 6.22386 10 6.5V11.5C10 11.7761 9.77614 12 9.5 12C9.22386 12 9 11.7761 9 11.5V6.5C9 6.22386 9.22386 6 9.5 6ZM4.75954 12.7027C4.86089 13.4459 5.49568 14 6.24578 14H9.75422C10.5043 14 11.1391 13.4459 11.2405 12.7027L12.4272 4H3.57281L4.75954 12.7027Z" fill="#838383" />
    </svg>`;


    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        const li = document.createElement("li");
        li.classList.add("todo-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `checkbox-${i}`;
        checkbox.classList.add("checkbox");

        const label = document.createElement("label");
        label.setAttribute("for", `checkbox-${i}`);
        label.textContent = `Task ${i + 1}: ${item.title}`;

        const trashIcon = document.createElement("span");
        trashIcon.classList.add("TrashBinIcon");
        trashIcon.innerHTML = trashBinIconSvg;

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(trashIcon);
        list.appendChild(li);
    }

    return list;
}

    /**
     * Button component
     * @param text {string}
     * @param onClick {function}
     * @returns {HTMLButtonElement} - Button element
     */
    function Button({text, onClick}) {
        const button = document.createElement("button");
        button.innerHTML = text;
        button.onclick = onClick;
        return button;
    }

    function Title({text}) {
        const title = document.createElement("title");
        title.innerHTML = text;
        return title;
    }

    function SearchField({ text }) {
        const searchField = document.createElement("input");
        searchField.innerHTML = text;
        return searchField;
}

    function AllTasksTitle({ text }) {
        const allTasksTitle = document.createElement("title");
        allTasksTitle.innerHTML = text;
        return allTasksTitle;
}

    function CompletedTasksTitle({ text }) {
        const completedTasksTitle = document.createElement("title");
        completedTasksTitle.innerHTML = text;
        return completedTasksTitle;
    }

    function CreateModal({ titleText, newTaskText, cancelBtnText, addTaskBtnText }) {
        const modalOverlay = document.createElement("div");
        modalOverlay.classList.add("ModalOverlay");
        modalOverlay.style.display = "none";

        document.body.appendChild(modalOverlay);

        const modalWindow = document.createElement("div");
        modalWindow.classList.add("Modal");
        modalWindow.style.display = "none";
        modalOverlay.appendChild(modalWindow);

        const modalTitle = document.createElement("title");
        modalTitle.classList.add("ModalTitle");
        modalTitle.textContent = titleText;

        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("ModalCancelBtn");
        cancelBtn.textContent = cancelBtnText;

        cancelBtn.addEventListener("click", () => {
        modalOverlay.style.display = "none";
        });

        const addTaskBtn = document.createElement("button");
        addTaskBtn.classList.add("ModalAddTaskBtn");
        addTaskBtn.textContent = addTaskBtnText;

        const taskTitleInput = document.createElement("input");
        taskTitleInput.classList.add("TaskTitleInput");
        taskTitleInput.innerHTML = newTaskText;

        const modalBtnsContainer = document.createElement("div");
        modalBtnsContainer.classList.add("ModalBtnsContainer");
        modalBtnsContainer.appendChild(cancelBtn);
        modalBtnsContainer.appendChild(addTaskBtn);

        modalWindow.appendChild(modalTitle);
        modalWindow.appendChild(taskTitleInput);
        modalWindow.appendChild(modalBtnsContainer);

        return { modalOverlay, modalWindow };
    }



    /**
     * App container
     * @returns {HTMLDivElement} - The app container
     */
   

    function App() {
        let taskTitle;
        const [items, setItems] = useState(["Task 1", "Task 2", "Task 3"]);

        function addItem() {
            setItems([...items, `Task ${items.length + 1}: ${taskTitle}`]);
        }

        const div = document.createElement("div");

        const list = ListItem({ items });
        list.classList.add("Li");

        const { modalOverlay, modalWindow } = CreateModal({ titleText: "Add New Task", cancelBtnText: "Cancel", addTaskBtnText: "Add Task" });

        const addNewTaskBtn = document.createElement("button");
        addNewTaskBtn.textContent = "+ New Task";
        addNewTaskBtn.classList.add("AddTaskBtn");

        addNewTaskBtn.addEventListener("click", () => {
            modalOverlay.style.display = "flex";
            modalWindow.style.display = "flex";
        });

        const title = Title({ text: "To Do List"});
        title.classList.add("Title");

        const searchField = SearchField({});
        searchField.classList.add("SearchBox");
        searchField.placeholder = "Search Task";


        const allTasksTitle = AllTasksTitle({text: "All Tasks"});
        allTasksTitle.classList.add("AllTasksTitle");

        const completedTasksTitle = CompletedTasksTitle({ text: "Completed Tasks" });
        completedTasksTitle.classList.add("CompletedTasksTitle");


        div.append(title, searchField, addNewTaskBtn, allTasksTitle, list, completedTasksTitle);

        return div;
    }

    /**
     * Render the app.
     * On change whole app is re-rendered.
     */
    function renderApp() {
        const appContainer = document.getElementById("functional-example");
        appContainer.innerHTML = "";
        appContainer.append(App());
    }

    // initial render
    renderApp();
})();