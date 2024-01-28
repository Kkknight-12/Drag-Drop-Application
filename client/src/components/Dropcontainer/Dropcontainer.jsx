import React from "react"
import {  Droppable } from "react-beautiful-dnd"
import AddTask from "../addTask/AddTask"
import DragableComponent from "../DragAbleComponent/DragableComponent"

//
import "./dropContainer.css"

export default function Dropcontainer({ column, columnId }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "250px",
      }}
    >
      <Droppable droppableId={columnId} key={columnId}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver
                  ? "lightblue"
                  : "rgb(202 229 237 / 50%)",
                padding: 4,
                width: "100%",
                margin: "0 auto",
                minHeight: 500,
                borderRadius: 6,
              }}
            >
              <AddTask columnName={column.name} />

              {column?.items?.map((item, index) => {
                return (
                  <DragableComponent
                    key={item?._id}
                    item={item}
                    index={index}
                  />
                )
              })}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </div>
  )
}