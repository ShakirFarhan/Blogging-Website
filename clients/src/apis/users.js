import axios from "axios";
const url = "http://localhost:8000";
export const registerUser = async (body) => {
  try {
    return await axios.post(`${url}/register`, body);
  } catch (error) {
    console.log("Error in registerUser api");
  }
};

export const loginUser = async (data) => {
  try {
    return await axios.post(`${url}/login`, data, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }
};
export const getUserById = async (id) => {
  try {
    return await axios.get(`${url}/userById/${id}`);
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (id, body) => {
  try {
    return await axios.patch(`${url}/updateUser/${id}`, body);
  } catch (error) {
    console.log(error);
  }
};
export const followUser = async (id, body) => {
  try {
    return await axios.patch(`${url}/${id}/follow`, body);
  } catch (error) {
    console.log("error in follow user api " + error);
  }
};
export const userFollowers = async (id) => {
  try {
    return await axios.get(`${url}/${id}/followers`);
  } catch (error) {
    console.log("errpr in userfollowers api");
  }
};
export const userFollowings = async (id) => {
  try {
    return await axios.get(`${url}/${id}/followings`);
  } catch (error) {
    console.log("errpr in userfollowings api");
  }
};
export const blogsCount = async () => {
  try {
    return await axios.get(`${url}/blogscount`);
  } catch (error) {
    console.log("error in blogscount");
  }
};
export const usersCount = async () => {
  try {
    return await axios.get(`${url}/userscount`);
  } catch (error) {
    console.log("error in blogscount");
  }
};
