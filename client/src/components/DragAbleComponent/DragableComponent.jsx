import React from "react"
import { Draggable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"

export default function DragableComponent({ item, index }) {
  const dispatch = useDispatch()

  const handleTaskModal = (taskData) => {
    dispatch({ type: "SET_DATA", payload: taskData, showModal: true })
  }

  return (
    <Draggable draggableId={item?._id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            onClick={() => handleTaskModal(item)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              borderRadius: "6px",
              userSelect: "none",
              padding: 16,
              margin: "0 0 8px 0",
              minHeight: "50px",
              backgroundColor: snapshot.isDragging ? "#263B4A" : "#FFFFFF",
              color: "white",
              ...provided.draggableProps.style,
            }}
          >
            <div className="drag-desc">
              <p className="drag-title">{item?.title}</p>
              <p className="">{item?.description}</p>
              <p className="text-muted text-end">{item?.owner}</p>
            </div>
          </div>
        )
      }}
    </Draggable>
  )
}