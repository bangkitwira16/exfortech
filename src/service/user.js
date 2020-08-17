import axios from "axios";

function getUsers(params) {
  return axios
    .get("static/json/users.json", {params: params})
}

export { getUsers };
