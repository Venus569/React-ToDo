import {StatusLine} from "./components/StatusLine"
import { useState, useEffect } from "react";



function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);
  
  function addEmptyTask(status) {
    const lastTask = tasks[tasks.length - 1];

    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        title: "",
        description: "",
        urgency: "",
        status: status,
      },
    ]);
  }


  function addTask(taskToAdd) {
   /*let filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id;
    });

    let newTaskList = [...filteredTasks, taskToAdd];
    */
    
    
    
    let newTaskList=[];
    tasks.forEach(task => {
      if(task.id===taskToAdd.id)
        {
          newTaskList.push(taskToAdd);
        }
        else
        newTaskList.push(task);
    });

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
  }

  function deleteTask(taskId) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(filteredTasks);

    saveTasksToLocalStorage(filteredTasks);
  }

  function moveTask(id, newStatus) {
    /*let task = tasks.filter((task) => {
      return task.id === id;
    })[0];

    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    console.log("tasking ",task);
    task.status = newStatus;

    let newTaskList = [...filteredTasks, task];*/
     
    let newTaskList=[];
    tasks.forEach(task => {
      if(task.id===id)
        task.status=newStatus;
      newTaskList.push(task);
    });

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
  }

  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
    }
  }





  return (
  <>
   
    <video autoplay muted loop id="myVideo">
      <source src="1086875507-preview.mp4" type="video/mp4" />
      Your browser does not support HTML5 video.
    </video>

    <div class="container">
      
      
      <h1 class="headers">To do tasks</h1>
      <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="In Progress"
          />

<h1 class="headers">Finished tasks</h1>

          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Done"
          />
    </div>
  
  </>
  );
}

export default App;
