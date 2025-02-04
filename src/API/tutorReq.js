import axios from "../axios/axios";



export const login = async (datas) => {
    try {
      const response = await axios.post("/googleAuth", { datas })
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const create_slot = async (formValues) => {
    try {
        const response = await axios.post("/tutor/create_slot",{
            formValues
        }, { headers: {
            Authorization: localStorage.getItem('tutortoken')
          }
         
        })
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const get_wallet = async (formValues) => {
    try {
        const response = await axios
        .get("/tutor/get_wallet", {
          headers: {
            Authorization: localStorage.getItem("tutortoken"),
          },
        })
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const get_report= async (selectedDate) => {
    try {
        const response = await  axios
        .get("/tutor/get_report", {
          headers: {
            Authorization: localStorage.getItem("tutortoken"),
          },
  
          params: {
            selectedDate,
          },
        })
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const get_monthlylineChart= async () => {
    try {
        const response = await  axios
        .get("/tutor/get_monthlylineChart", {
          headers: {
            Authorization: localStorage.getItem("tutortoken"),
          },
        })
      return response;
    } catch (error) {
      throw error;
    }
  };

