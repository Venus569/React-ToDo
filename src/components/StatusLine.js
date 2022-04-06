import React from 'react'
import { Task } from './Task';
import { useState, useEffect } from "react";


export const StatusLine = (props) => {
  const { status, tasks, addTask, deleteTask, addEmptyTask, moveTask } = props;

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
        />
      );
    });
  }
    return (
        <div className="statusLine">
         
          {taskList}
         
          <button onClick={handleAddEmpty} className="button addTask">
          +
          </button>
         
        </div>
      );
}
