import React from 'react'
import { useState, useEffect } from "react";

export const Task = (props) => {
  const { bs,
  handleChangeBS,addTask, deleteTask, moveTask, task } = props;


    const [collapsed, setCollapsed] = useState(task.isCollapsed);
    const [formAction, setFormAction] = useState("");
    const [zoom,setZoom]=useState(false);

    console.log("bs value",bs);


    function handleSubmit(event) {
        event.preventDefault();
    
        if (formAction === "save") {
          if (collapsed) {
            setCollapsed(false);
          } else {
            let newTask = {
              id: task.id,
              title: event.target.elements.title.value,
              description: event.target.elements.description.value,
              status: task.status,
              isCollapsed: true,
            };
    
            addTask(newTask);
            setCollapsed(true);
          }
        }
    
        if (formAction === "delete") {
          deleteTask(task.id);
        }
      }
      function handleMoveRight() {
        let newStatus = "";
    
        if (task.status === "Backlog") {
          newStatus = "In Progress";
        } else if (task.status === "In Progress") {
          newStatus = "Done";
        }
    
        if (newStatus !== "") {
          moveTask(task.id, newStatus);
        }
      }



  return (
    <div className='tasks' onMouseEnter={() => {handleChangeBS(!bs)}}
    onMouseLeave={() => {handleChangeBS(!bs)}}>
    
      <div  
            className={`task ${collapsed ? "collapsedTask" : ""}   `}>
      <div className='taskheader'>{task.title}</div>
      
      <p></p>
      <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
        <input
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Title"
          disabled={collapsed}
          defaultValue={task.title}
          
        />
        <textarea
          rows="4"
          className="description input"
          name="description"
          placeholder="Enter Description"
          defaultValue={task.description}
        />
        {collapsed?<p className={`texts ${bs ? "" : "thin"}`}>{task.description}</p>:null}
        <button
          onClick={() => {
            setFormAction("save");
          }}
          className={`button edit ${bs ? "" : "thin"}`}
        >
          {collapsed ? "Edit" : "Save"}
        </button>
        {collapsed && (
          <button
            onClick={() => {
              setFormAction("delete");
            }}
            className={`button delete ${bs ? "" : "thin"}`}
          >
            X
          </button>
        )}
        {collapsed && (
        <button onClick={handleMoveRight} className={`button moveTask ${bs ? "" : "thin"}`}>
        &#187;
      </button>)}
      </form>
      
    </div>
    </div>
    
  );


}
//${bs ? "" : "thin"}