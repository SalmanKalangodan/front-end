const token = localStorage.getItem("token")
const refresh_token = localStorage.getItem('refresh_token')
const consfig = {
    headers : {
      "content-type":"application/json",
      Authorization:token,
      refresh_token
    }
}

export default consfig

export const userConfig = {
  headers : {
  'Content-Type': 'multipart/form-data',
    Authorization:token,
    refresh_token
  }
}