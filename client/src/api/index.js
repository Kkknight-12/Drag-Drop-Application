import axios from "axios"

const url = process.env.REACT_APP_HOST_API_KEY;
// const url = "https://resume-project-drag-drop.herokuapp.com"
const API = axios.create({ baseURL: url })

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userInfo")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userInfo")).token
    }`
  }
  return req
})

export const fetchTask = () => API.get(`/api/tasks`)
export const login = (email, password) =>
  API.post("/api/user/login", { email, password })
export const registerUser = (name, email, password) =>
  API.post("/api/user/register", { name, email, password })
// /api/tasks/taskposition
export const updatePosition = (position, title, description, name, owner) =>
  API.post("/api/tasks/taskposition", {
    position,
    title,
    description,
    name,
    owner,
  })
export const addNewTask = (title, description, columnName) =>
  API.post("/api/tasks", { title, description, column: columnName })
// delete not working
// not able to send data
// export const deletePosition = (name, _id) =>
//     API.delete("/tasks/taskposition", { name, _id });
//
export const updateTask = (name, _id, description) =>
  API.patch("/api/tasks", {
    name,
    _id,
    description,
  })