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
    <div ref={ref} className="task-modal-container">
      <div
        className=""
        style={{
          // position: "relative",
          margin: "auto",
          width: "50%",
          minWidth: "375px",
          maxWidth: "620px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // padding: "4px",
          paddingLeft: "8px",
          paddingRight: "8px",
          // backgroundColor: "rgba(202, 229, 237, 0.9)",
          backgroundColor: "rgba(203, 226, 233, 0.9)",
          // border: "solid 2px green",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            cursor: "pointer",
            border: "none",
            marginBlock: "10px",
            display: "flex",
            justifyContent: "flex-end",
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

        <div
          className="row text-center"
          style={{
            display: "flex",
            justifyContent: "space-between",
            // border: "solid 2px white",
            marginBlock: "10px",
            padding: "10px",
            margin: "0 auto",
          }}
        >
          <div className="col mt-4">Created By</div>
          <div className="col-8 mt-4 text-center">{modalData?.owner}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 0,
            }}
          >
            <div className="col mt-4">Description</div>

            <div className="col-8 mt-4">
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                style={{
                  borderRadius: "4px",
                }}
                name=""
                id=""
              >
                {modalData?.description}
              </textarea>
            </div>
          </div>
        </div>
        <div class="text-center mb-2">
          <button className="btn submit-btn" onClick={handleSaveModal}>
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null
}
