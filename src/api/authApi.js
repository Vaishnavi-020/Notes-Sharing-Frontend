import api from "./axios";

export const loginUser = async(data) => {
    const params=new URLSearchParams()

    params.append("username",data.email)
    params.append("password",data.password)

    const response=await api.post("/authorization/login", params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response.data
}

export const registerUser=async(data)=>{
    const response=await api.post("/authorization/register",data)
    return response.data
}

