
function loadTasks(taskList){
    let container = document.getElementById('taskContainer');
    container.innerHTML='';

    taskList.forEach((task,i)=>{
        let divTask = document.createElement('div');
        divTask.className="taskCard";
        divTask.innerHTML = `
            ${task.img?"<img src='" + task.img + "' />":""}
            <h4> <input type="checkbox" ${task.completed?"checked":""} title="check completed">  ${task.title + ' ' + i}</h4>
            <span>created on ${task.createdOn} by ${task.createdBy}</span>
            <p>${task.description}</p>
            <span>Due on ${task.dueDate}</span>
        `;

        if(task.completed)
            divTask.classList.add("taskCompleted");
        else if(task.dueDate < Date.now() )
            divTask.classList.add("taskLate");


        container.appendChild(divTask);
    });
}


loadTasks(taskList);


function addTask(task){
  newTaskForm();
}

const newTaskForm = function () {
  let container = document.getElementById('taskContainer');
  let form = document.createElement('div');
  let today = new Date();
  today = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  form.id="new-task-form";
  form.innerHTML = `
  <form>
  <input type="text" name="username" id="username" placeholder="User name">
  <input type="text" name="image" id="image" placeholder="Image url">
  <input type="text" name="title" id="title" placeholder="Task title">
  <textarea name="description" id="description" placeholder="Task description"></textarea>
  <input type="date" name="due-date" id="due-date" value="${today}" min="${today}">
  <button type="button" id="submit">Save task</button>
  </form>
  `;
  const listParent = container.parentNode;
  listParent.insertBefore(form, container);

  document.getElementById('submit').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const image = document.getElementById('image').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    // if (title && description && dueDate) {
      const task = {
        title: title,
        description: description,
        img: image,
        dueDate: dueDate,
        createdOn: new Date(),
        createdBy: username
      };
      taskList.unshift(task);
      loadTasks(taskList);
      document.getElementById('new-task-form').remove();
    // }
  });

};