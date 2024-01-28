import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { updateTaskPosition, deleteTaskPosition } from "../../actions/tasks"

export default function onDragEnd(result, columns, setColumns, dispatch) {
  if (!result.destination) return

  const { source, destination } = result

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]

    //
    const [removed] = sourceItems.splice(source.index, 1)

    //
    destItems.splice(destination.index, 0, removed)

    // dispatch the task and new position to BE
    const { items } = sourceColumn

    dispatch(
      updateTaskPosition(
        items[source.index],
        destination.index,
        destColumn.name
      )
    )

    dispatch(deleteTaskPosition(sourceColumn.name, items[source.index]._id))

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
    // remove the task from source
    const [removed] = copiedItems.splice(source.index, 1)
    // add the task to destination
    copiedItems.splice(destination.index, 0, removed)

    dispatch(updateTaskPosition(removed, destination.index, removed.name))
    dispatch(deleteTaskPosition(removed.name, removed._id))

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    })
  }
}
