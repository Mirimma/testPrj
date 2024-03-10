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
        
        //const title = "To Do List"; //added a title in the code manually

        const title = document.getElementsByTagName('title'); //get the title from the html using DOM
        //title.style.color = 'red'; can't apply any style here - don't know why - it's just disappeared in browser, tried to use [0] as an element number above

        div.append(title, button, list);
        
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