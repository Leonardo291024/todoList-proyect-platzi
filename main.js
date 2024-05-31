const inputTarea = document.getElementById('inputTarea');
const btnAgregar = document.getElementById('btnAgregar');
btnAgregar.style.display = 'none'
const listaDeTareas = document.getElementById('lista-deTareas');
const title = document.getElementById('title');

class Task{
    constructor(titulo){
        this.titulo = titulo;
        this.complete = false;
    }

    markAsComplete(){
        this.complete = true
    }

    markAsInComplete(){
        this.complete = false;
    }

}

class TodoList{
    constructor(){
        this.tasks = [];
    }

    addTask(task){
        this.tasks.push(task);
    }

    removeTask(titulo){
        this.tasks = this.tasks.filter(task => task.titulo !== titulo);
    }

    getCompleteTasks(){
        return this.tasks.filter(task => task.complete);
    }

    getIncompleteTask(){
        return this.tasks.filter(task => !task.complete);
    }
}

const myTodoList = new TodoList();

function agregarTarea(){
    const valorInput = inputTarea.value;
    const nuevaTarea = new Task(valorInput);

    if(valorInput === ''){
        title.innerText = "Debes asiginar una tarea"
    }else{
        title.innerText = "Tareas"
        let tareaNueva = document.createElement('article');

        let divCheck = document.createElement('div');
        divCheck.classList.add('div-check');

        let imgCheck = document.createElement('img');
        imgCheck.setAttribute('src', './images/icon-check.svg');
        imgCheck.addEventListener('click', () =>{
            if(!divCheck.classList.toggle('check')){
                nuevaTarea.markAsInComplete();
            }else{
                nuevaTarea.markAsComplete();
            }
            
            
        })

        let textTarea = document.createElement('p');
        textTarea.classList.add('text-tarea');
        textTarea.innerText = nuevaTarea.titulo;

        let imgDelete = document.createElement('img');
        imgDelete.classList.add('icon-close')
        imgDelete.setAttribute('src', './images/icon-cross.svg');
        imgDelete.addEventListener('click', (e) =>{
            let tarea = e.target.parentNode;
            tarea.remove();
            myTodoList.removeTask(nuevaTarea.titulo)
        });

        
        

        listaDeTareas.appendChild(tareaNueva);

        tareaNueva.appendChild(divCheck);

        divCheck.appendChild(imgCheck);

        tareaNueva.appendChild(textTarea);
        tareaNueva.appendChild(imgDelete);

        myTodoList.addTask(nuevaTarea)
    }

}

btnAgregar.addEventListener('click', agregarTarea);

inputTarea.addEventListener('keydown', (e) =>{
    if(e.key === 'Enter'){
        agregarTarea();
    }
})