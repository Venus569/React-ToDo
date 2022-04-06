import React from 'react'
import { useState, useEffect } from "react";

export const Task = (props) => {
  const { addTask, deleteTask, moveTask, task } = props;


    const [collapsed, setCollapsed] = useState(task.isCollapsed);
    const [formAction, setFormAction] = useState("");
    const [zoom,setZoom]=useState(false);

//    handleBoxToggle = () => this.setState({ showBox: !this.state.showBox });


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
    <div className='tasks'>
    
      <div className={`task ${collapsed ? "collapsedTask" : ""}`}>
      <div className='taskheader'>{task.title}</div>
      <div className='taskdescription'>{task.description}</div>
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
          rows="2"
          className="description input"
          name="description"
          placeholder="Enter Description"
          defaultValue={task.description}
        />
        
        <button
          onClick={() => {
            setFormAction("save");
          }}
          className="button"
        >
          {collapsed ? "Edit" : "Save"}
        </button>
        {collapsed && (
          <button
            onClick={() => {
              setFormAction("delete");
            }}
            className="button delete"
          >
            X
          </button>
        )}
      </form>
      <button onClick={handleMoveRight} className="button moveTask">
        &#187;
      </button>
    </div>
    </div>
    
  );


}
