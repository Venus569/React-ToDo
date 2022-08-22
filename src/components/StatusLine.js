import React from 'react'
import { Task } from './Task';
import { useState, useEffect } from "react";
import plusimg from './plus.png'


export const StatusLine = (props) => {
  const { status, tasks, addTask, deleteTask, addEmptyTask, moveTask } = props;
  const [bs,setBS]=useState(true);
  let taskList, tasksForStatus;

  function handleAddEmpty() {
    addEmptyTask(status);
  }

  if (tasks) {
    tasksForStatus = tasks.filter((task) => {
      return task.status === status;
    });
  }

  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {
      return (
        <Task
          addTask={(task) => addTask(task)}
          deleteTask={(id) => deleteTask(id)}
          moveTask={(id, status) => moveTask(id, status)}
          key={task.id}
          task={task}
          bs={bs}
          handleChangeBS={setBS}
        />
      );
    });
  }
    return (
        <div className={bs?"statusLine":"statusLine thick"}>
          
          {taskList}
         
          <button onMouseLeave={() => {setBS(true)}} onClick={handleAddEmpty} className="button addTask">
          <div style={{ 
            display:'inline-flex',
            alignItems:'center',
            justifyContent:'center',
            height:'50px',
            width:'50px',
            fontWeight:'bolder',
            color:'black',
            background:'transparent',
            borderRadius:'50%',
            
            }}>+</div>
          </button>
         
        </div>
      );
}
