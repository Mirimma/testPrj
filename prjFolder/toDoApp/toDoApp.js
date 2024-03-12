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
    function List({items}) {
        const listItems = items.map((item) => `<li>${item}</li>`).join("");
        const ul = document.createElement("ul");
        ul.innerHTML = listItems;
        return ul;
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

    /**
     * App container
     * @returns {HTMLDivElement} - The app container
     */
   

    function App() {
        const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

        function addItem() {
            setItems([...items, `Item ${items.length + 1}`]);
        }

        const div = document.createElement("div");
        const list = List({items});
        const button = Button({ text: "+ New Task", onClick: addItem });
        button.classList.add("AddTaskBtn");

        const title = Title({ text: "To Do List"});
        title.classList.add("Title");

        const searchField = SearchField({});
        searchField.classList.add("SearchBox");
        searchField.placeholder = "Search Task";

        const allTasksTitle = AllTasksTitle({text: "All Tasks"});
        allTasksTitle.classList.add("AllTasksTitle");

        const completedTasksTitle = CompletedTasksTitle({ text: "Completed Tasks" });
        completedTasksTitle.classList.add("CompletedTasksTitle");

        div.append(title, searchField, button, allTasksTitle, list, completedTasksTitle);
    
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