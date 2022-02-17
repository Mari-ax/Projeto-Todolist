
const getBank = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBank = (bank) => localStorage.setItem('todoList', JSON.stringify(bank));


const criarItem = (task, status, indice) => {
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

const atualizarTela = () => {
    cleanTasks();
    const bank = getBank();
    bank.forEach ((item, indice) => criarItem (item.task, item.status, indice));
}

const inserirItem = (event) => {
    const tecla = event.key;
    if (tecla === 'Enter') {
        const text = event.target.value;
        const bank = getBank();
        bank.push ({'task': text, 'status': ''});
        setBank(bank);
        atualizarTela();
        event.target.value = '';
    }

}

const removeItem = (indice) => {
    const bank = getBank();
    bank.splice (indice, 1);
    setBank(bank);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const bank = getBank();
    bank[indice].status = bank[indice].status === '' ? 'checked' : '';
    setBank(bank);
    atualizarTela();
}

const clickItem = (event) => {
    const element = event.target;
    if (element.type === 'button') {
        const indice = element.dataset.indice;
        removeItem(indice);
    }else if (element.type === 'checkbox') {
        const indice = element.dataset.indice;
        atualizarItem (indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela(); // Every time my bank is modified, this function will be called.

