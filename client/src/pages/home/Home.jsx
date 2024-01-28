import React from "react"
import { useEffect, useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { useDispatch, useSelector } from "react-redux"
import TaskModal from "../../components/taskModal/TaskModal"
import "./home.css"

import { getPost } from "../../actions/tasks"
import Dropcontainer from "../../components/Dropcontainer/Dropcontainer"
import Navbar from "../../components/navbar/Navbar"
import onDragEnd from "../../components/dragDropContextComponent/onDragEnd"
import { ContainerHeader } from "../../components/containerHeader"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

// ------------------------------------------------------------------------------

export default function Home() {
  const [columns, setColumns] = useState({})

  const dispatch = useDispatch()
  const task = useSelector((state) => state.task)
  const { columnsFromBackendd, isLoading } = task

  useEffect(() => {
    if (Object.keys(columnsFromBackendd).length > 0) {
      setColumns(columnsFromBackendd)
    }
  }, [columnsFromBackendd])

  useEffect(() => {
    dispatch(getPost())
  }, [dispatch])

  return (
    <>
      <Navbar />
      <TaskModal />
      <div
        className="container"
        style={{
          marginTop: "50px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            overflowX: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridGap: "10px",
            padding: "0 20px",
          }}
        >
          <DragDropContext
            onDragEnd={(result) =>
              onDragEnd(result, columns, setColumns, dispatch)
            }
          >
            {columns.hasOwnProperty("todo") &&
              Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <div
                    style={{
                      backgroundColor: "rgb(203 226 233 / 50%)",
                      borderRadius: "6px",
                      maxWidth: "400px",
                    }}
                    className="p-2 m-2"
                    key={columnId}
                  >
                    <ContainerHeader column={column} />

                    {isLoading ? (
                      <>
                        <SkeletonTheme
                          baseColor="rgb(203 220 233 / 50%)"
                          highlightColor="rgb(147, 210, 233)"
                        >
                          <Skeleton
                            key={index}
                            count={1}
                            height={500}
                            style={{ minWidth: "250px" }}
                          />
                        </SkeletonTheme>
                      </>
                    ) : (
                      <Dropcontainer columnId={columnId} column={column} />
                    )}
                  </div>
                )
              })}
          </DragDropContext>
        </div>
      </div>
    </>
  )
}
