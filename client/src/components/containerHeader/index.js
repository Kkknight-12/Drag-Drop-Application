import React from "react"

export const ContainerHeader = ({ column }) => {
  return (
    <div className="d-flex flex-row justify-content-between">
      <p className="fw-bolder">{column?.name}</p>
      <div className="col-count d-flex flex-column count-circle">
        <div className="fw-bolder">{column.items.length}</div>
      </div>
    </div>
  )
}
