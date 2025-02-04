import axios from "../axios/axios";



export const get_otp = async(number)=>{
    try {
        const response = await  axios
        .post("/get_otp", {
          number
         
        })
        return response
        
    } catch (error) {
        return error?.response
    }
}

export const signup = async(formValues)=>{
    try {
        const response = await  axios
        .post("/signup", {
            formValues        
        })
        return response
        
    } catch (error) {
        return error?.response
    }
}


export const verify_otp = async(number,storeOTP)=>{
    try {
        const response = await axios
        .post("/verify_otp", {
          storeOTP,
          number,
        })
        return response
        
    } catch (error) {
        return error?.response
    }
}

export const login = async (formValues) => {
    try {
        const response =await  axios
        .post("/login", {
          formValues,
        })
      return response; 
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error; 
    }
  };



export const getTeachers = ()=>{
    try {
        const response = axios.get('/get_teachers')
        return response
        
    } catch (error) {
        return error?.response
    }
}
export const filterTeachers = (checkedValues)=>{
    try {
        const response = axios .post(`/filter_our_teacher`, { checkedValues })
        return response
        
    } catch (error) {
        return error?.response
    }
}

export const getSubject = async()=>{
    try {
        const response = await axios .get(`/get_subject`)
        return response
        
    } catch (error) {
        return error?.response
    }
}

export const getTeachersDetails =(id)=>{
    try {
        const response = axios
        .get("/get_teacherDetails", {
          params: {
            id,
          },
        })
        return response
        
    } catch (error) {
        return error?.response
    }
}


export const getReviwes = async (id) => {
    try {
      const response = await axios.get("/get_reviews", {
        params: {
          id,
        },
      });
      return response; 
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error; 
    }
  };

  export const getReservation = async (id) => {
    try {
      const response = await axios
      .get("/reservation_page", {
        params: {
          id,
        },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      return response; 
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error; 
    }
  };

  export const filter_slot = async (id,selectedDate) => {
    try {
      const response = await   axios
      .post(
        "/filter_slot",
        {
          id,
          selectedDate,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      return response; 
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error; 
    }
  };

  export const edit_profile_image = async (imgBase) => {
    try {
      const response = await  axios
      .post(
        "/edit_profile_image",
        {
          imgBase,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      return response; 
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error; 
    }
  };

  export const get_profile = async () => {
    try {
      const response = await axios
      .get("/get_profile", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      return response; 
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error; 
    }
  };

  export const get_bookings = async () => {
    try {
      const response=  axios
        .get("/get_bookings", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
      return response; 
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error; 
    }
  };
  export const cancel_booking = async (slot_id, order_id) => {
    try {
     const response= await axios
      .post(
        "/cancel_booking",
        { slot_id, order_id },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      return response; 
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error; 
    }
  };

  