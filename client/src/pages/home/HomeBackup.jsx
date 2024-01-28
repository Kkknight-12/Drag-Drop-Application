import React from "react"
import { useEffect, useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { useDispatch, useSelector } from "react-redux"

import { v4 as uuidv4 } from "uuid"
// import { fetchTask } from "./api";
import { getPost } from "../../actions/tasks"

const itemsFromBackend = [
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" },
  { id: uuidv4(), content: "Third task" },
  { id: uuidv4(), content: "Fourth task" },
  { id: uuidv4(), content: "Fifth task" },
]

const columnsFromBackend = {
  [uuidv4()]: {
    name: "To do",
    items: itemsFromBackend,
  },
  [uuidv4()]: {
    name: "In Progress",
    items: [],
  },
  [uuidv4()]: {
    name: "Done",
    items: [],
  },
}

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return
  const { source, destination } = result

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    })
  } else {
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    })
  }
}

export default function Home() {
  const [columns, setColumns] = useState({})
  // console.log("columns", columns);
  // console.log("Object.entries(columns)", Object.entries(columns));
  // [{…}, {…}, {…}]-> id:___, description: ___
  // const [columns, setColumns] = useState([]);
  const dispatch = useDispatch()
  const task = useSelector((state) => state.task)
  // console.log("task+", task);
  const { itemsFromBackend, isLoading, columnsFromBackendd } = task
  // const [columns, setColumns] = useState(columnsFromBackendd || {});
  // console.log("columnsFromBackendd+", columnsFromBackendd);
  // console.log(
  //     "Object.entries(columnsFromBackendd)",
  //     Object.entries(columnsFromBackendd)
  // );

  useEffect(() => {
    dispatch(getPost())
  }, [dispatch])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <DragDropContext
      // onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columnsFromBackendd).map(
          ([columnId, column], index) => {
            // console.log("columnId", index);
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "rgb(234, 239, 243)"
                              : "rgb(193, 197, 200)",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.description}
                                    </div>
                                  )
                                }}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                        </div>
                      )
                    }}
                  </Droppable>
                </div>
              </div>
            )
          }
        )}
      </DragDropContext>
    </div>
  )
}
