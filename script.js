const getElement = (id) => {
    const element = document.getElementById(id);
    return element;
}

const addButton = () => {
    const todos = JSON.parse(localStorage.getItem("TODOS"))
    todoInputElement = getElement('todo-text');
    const todoInputText = todoInputElement.value
    if (todoInputText === '') {
        alert("Todo field is required");
    }
    else if (!todos) {
        localStorage.setItem("TODOS", JSON.stringify(
            [
                {
                    title: todoInputText,
                    completed: false
                }
            ]
        ))
    } else {
        localStorage.setItem("TODOS", JSON.stringify(
            [
                ...todos, {
                    title: todoInputText,
                    completed: false
                }
            ]
        ))
    }
    todoInputElement.value = '';
    render()
}

const render = () => {
    const todosItemsList = JSON.parse(localStorage.getItem("TODOS"));
    const todosItemsListContainer = getElement('todo-list');
    todosItemsListContainer.innerHTML = '';
    for (item of todosItemsList) {
        const li = document.createElement('li');
        li.innerText = item?.title;
        li.classList.add('py-2', "flex", "justify-between");
        li.innerHTML = `${item?.title} 
        <button class="btn text-red-600" id='btn' onclick="handleDelete(event)">Delete</button>
        `
        todosItemsListContainer.appendChild(li)
    }

}
const handleDelete = (event) => {
    const deleteItem = event.target.parentNode.innerText
    const splitItem = deleteItem.replace(`\nDelete`, '')
    const todosItems = JSON.parse(localStorage.getItem("TODOS"))
    const restItems = todosItems.filter(item => item.title !== splitItem)
    localStorage.setItem("TODOS", JSON.stringify(restItems))
    render()
}
const removeButton = () => {
    localStorage.removeItem("TODOS")
    render()
}

render()