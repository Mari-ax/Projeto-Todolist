
const getBank = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBank = (bank) => localStorage.setItem('todoList', JSON.stringify(bank));


const createItem = (task, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox"${status} data-indice=${indice}>
        <div>${task}</div>
        <input type="button" value="X" data-indice=${indice}>

    `
    document.getElementById('todoList').appendChild(item);
}

const cleanTasks = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const refreshScreen = () => {
    cleanTasks();
    const bank = getBank();
    bank.forEach ((item, indice) => createItem (item.task, item.status, indice));
}

const insertItem = (event) => {
    const tecla = event.key;
    if (tecla === 'Enter') {
        const text = event.target.value;
        const bank = getBank();
        bank.push ({'task': text, 'status': ''});
        setBank(bank);
        refreshScreen();
        event.target.value = '';
    }

}

const removeItem = (indice) => {
    const bank = getBank();
    bank.splice (indice, 1);
    setBank(bank);
    refreshScreen();
}

const updateItem = (indice) => {
    const bank = getBank();
    bank[indice].status = bank[indice].status === '' ? 'checked' : '';
    setBank(bank);
    refreshScreen();
}

const clickItem = (event) => {
    const element = event.target;
    if (element.type === 'button') {
        const indice = element.dataset.indice;
        removeItem(indice);
    }else if (element.type === 'checkbox') {
        const indice = element.dataset.indice;
        updateItem (indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', insertItem);
document.getElementById('todoList').addEventListener('click', clickItem);

refreshScreen(); // Every time my bank is modified, this function will be called.