import React, { useState } from "react"
import { addTask } from "../../actions/tasks"
import { useDispatch, useSelector } from "react-redux"

//
import "./addTask.css"

const initialState = {
  title: "",
  description: "",
}

export default function AddTask({ columnName }) {
  const dispatch = useDispatch()
  const [showAddTask, setShowAddTask] = useState(false)
  const [taskData, setTaskData] = useState(initialState)
  // console.log("taskData", taskData);
  // console.log("column", columnName);

  const handleKeyPress = (e) => {
    /* 
        keycode 13 is for Enter key
        when user press key and that is ENTER condition will run
        */
    if (e.keyCode === 13) {
      // search post
      dispatch(addTask(taskData, columnName))
      setShowAddTask(false)
      // searchPost();
    }
  }

  const handleShowTask = () => {
    setShowAddTask(!showAddTask)
  }

  const handleData = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value })
  }

  return (
    <div className="AddTaskContainer text-center pb-2">
      <div className="add-task-plus">
        <i onClick={handleShowTask} className="fa-solid fa-plus"></i>
        {/* <button className="">AddTask</button> */}
      </div>
      <div>
        {showAddTask ? (
          <div className="add-task-input">
            <input
              style={{
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                borderStyle: "none",
                borderColor: "Transparent",
                // display: "block",
                width: "96%",
                // minHeight: "100Px",
              }}
              onKeyDown={handleKeyPress}
              name="title"
              onChange={handleData}
              placeholder="Give your task a title"
              className=""
              type="text"
            />
            <input
              style={{
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
                borderStyle: "none",
                borderColor: "Transparent",
                // display: "block",
                width: "96%",
                minHeight: "100Px",
              }}
              onKeyDown={handleKeyPress}
              name="description"
              onChange={handleData}
              placeholder="Description.."
              className="mb-2 pb-2"
              type="text"
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
