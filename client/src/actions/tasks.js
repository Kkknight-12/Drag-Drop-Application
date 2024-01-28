import * as api from "../api"
import axios from "axios"

export const getPost = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" })
    const { data } = await api.fetchTask()
    dispatch({ type: "FETCH_ALL", payload: data })
    dispatch({ type: "END_LOADING" })
  } catch (error) {
    console.log(error.message)
  }
}

// add task
export const addTask =
  ({ title, description }, columnName) =>
  async (dispatch) => {
    // console.log("addTask", description, columnName)
    try {
      const { data } = await api.addNewTask(title, description, columnName)
      // console.log(data.acknowledged);
      dispatch(getPost())
    } catch (error) {
      console.log(error.message)
    }
  }

export const updateTaskPosition =
  (data, position, name) => async (dispatch) => {
    const { title, description, owner } = data
    // const { column } = column;
    // console.log("data", description, owner);
    // console.log("name", name);
    // console.log("position", position);

    try {
      // dispatch({ type: "START_LOADING" });
      const { data } = await api.updatePosition(
        position,
        title,
        description,
        name,
        owner
      )
      dispatch(getPost())
      // dispatch({ type: "FETCH_ALL", payload: data });
      // dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error.message)
    }
  }

export const deleteTaskPosition = (name, _id) => async (dispatch, getState) => {
  // console.log("delete");
  // console.log("name", name);
  // console.log("_id", _id);

  try {
    // dispatch({ type: "START_LOADING" });
    // const { data } = await api.deletePosition(name, _id);
    const {
      userLoginAndRegister: { userInfo },
    } = getState()

    const { data } = await axios({
      url: `${process.env.REACT_APP_HOST_API_KEY}api/tasks/taskposition`,
      method: "delete",
      data: { name, _id },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    })

    // console.log(data)
    dispatch(getPost())
  } catch (error) {
    console.log(error.message)
  }
}

export const sendTaskModalData =
  (name, id, desc) => async (dispatch, getState) => {
    try {
      const { data } = await api.updateTask(name, id, desc)
      //   console.log(data)
      dispatch(getPost())
    } catch (error) {
      console.log(error.message)
    }
  }