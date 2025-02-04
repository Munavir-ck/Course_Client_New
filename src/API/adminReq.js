import axios from "../axios/axios";

export const login = async (formValues) => {
  try {
    const response = await axios.post("/admin/login", {
      formValues,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const add_subject = async (checkedValues, subject) => {
  try {
    const response = await axios.post(
      "/admin/add_subject",
      {
        checkedValues,
        subject,
      },
      {
        headers: {
          Authorization: localStorage.getItem("admintoken"),
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_subject = async () => {
  try {
    const response = await axios.get("/admin/get_subject", {
      headers: {
        Authorization: localStorage.getItem("admintoken"),
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


export const add_teachers = async (  formValues) => {
    try {
      const response = await axios
      .post("/admin/add_teachers", {
        formValues,
      },{ headers: {
        Authorization: localStorage.getItem("admintoken"),
      }},)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const get_transction = async (  formValues) => {
    try {
      const response = await  axios
      .get("/admin/get_transction", {
        headers: { Authorization: localStorage.getItem("admintoken") },
      })
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const get_dailyReport = async (selectedDate) => {
    try {
      const response = await axios
      .get("/admin/get_dailyReport", {
        params: {
          selectedDate,
        },
        headers: {
          Authorization: localStorage.getItem("admintoken"),
        },
      })
      return response;
    } catch (error) {
      throw error;
    }
  };
  export const get_piechart = async () => {
    try {
      const response = await axios.get("/admin/get_piechart",{ headers: {
        Authorization: localStorage.getItem("admintoken"),
      }})
      return response;
    } catch (error) {
      throw error;
    }
  };
