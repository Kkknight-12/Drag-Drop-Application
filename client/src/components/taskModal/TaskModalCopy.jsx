import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./taskModal.css"

//action
import { sendTaskModalData } from "../../actions/tasks"

export default function TaskModal() {
  const dispatch = useDispatch()
  const [desc, setDesc] = useState()
  const ref = useRef()
  const data = useSelector((state) => state.taskModalR)
  const { showModal, modalData } = data
  // console.log("modalData", modalData);
  // console.log(desc);

  const handleModal = () => {
    dispatch({ type: "CLOSE_MODAL" })
  }

  const handleSaveModal = (e) => {
    dispatch(sendTaskModalData(modalData.name, modalData._id, desc))
    dispatch({ type: "CLOSE_MODAL" })
  }

  return showModal ? (
    <div ref={ref} className="task-modal-container m-5">
      <div
        className="task-modal p-4"
        style={{
          position: "relative",
        }}
      >
        <div
          style={{
            cursor: "pointer",
            top: 10,
            right: 9,
            position: "absolute",
            border: "none",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              width: "30px",
              height: "30px",
              borderRadius: 15,
              border: "none",
            }}
            onClick={handleModal}
          >
            X
          </button>
        </div>
        <div className="row p-4">
          <div className="col mt-4">Created By</div>
          <div className="col-8 mt-4">{modalData?.owner}</div>
        </div>
        <div className="row p-4">
          <div className="col">Description</div>

          <textarea
            onChange={(e) => setDesc(e.target.value)}
            className="col-8"
            name=""
            id=""
          >
            {modalData?.description}
          </textarea>
        </div>
        <div class="text-center">
          <button className="btn submit-btn" onClick={handleSaveModal}>
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null
}
