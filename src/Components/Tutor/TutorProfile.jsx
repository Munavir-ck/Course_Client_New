import React, { useState,useEffect } from "react";
import EditModal from "./EditModal";
import axios from '../../axios/axios'
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function TutorProfile() {
  const [isOpen, setOpen] = useState(false);
  const [image,setImage]=useState(null)
  const [tutorData,setData]=useState({})
  const[newImage,setNewimage]=useState(null)

  const toBase64=image=>new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  }).catch((err)=>{
    console.log(err);
  })

  const handleOnclick = () => {
    setOpen(true);
  };

  const handleImage=async(e)=>{
    setImage(e.target.files[0])
  
  }
  useEffect(()=>{
axios.get("/tutor/get_profile").then((res)=>{
  console.log(res.data.data[0])
  setData(res.data.data[0])
})


  },[newImage])

  useEffect(()=>{
  async function editProfile(params) {
      const ID= tutorData._id 
   
   if (image&&ID) {
    
       const imgBase = await toBase64(image)
       console.log(imgBase,333333);
       setImage()
       axios.post("/tutor/edit_profile_image",{
          ID,
          imgBase
       }).then((res)=>{
       toast.success("success")
       setNewimage(res.data.data.image)
      

        console.log(res.data);
       }).catch((res)=>{
        console.log("error");
        toast.error("error") 
       })
   }

  }

editProfile()

  },[image])

  
console.log(image,2222);


  return (
    <div className=" h-screen overflow-y-auto">
      {/* <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />

      <section className="pt-16 bg-blueGray-50 w-full">
      <ToastContainer/>
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
              <div class="flex justify-center">
  <div class="mb-3 w-96 px-9">
    
    <input
      className="w-25 relative m-0 block  min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
      type="file"
      id="formFile" 
      onChange={handleImage}
      />
  </div>
</div>
                <div className="w-full px-4 flex justify-center">
                    
                  <div className="relative">
                    <img
                      alt="..."
                      src={(tutorData.image)?tutorData.image:"../../../avatar.png"}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                    
                    
                  </div>
                </div>
              
                <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                        
                      {isOpen ? (
                        <div>X</div>
                      ) : (
                        <button
                          data-modal-target="authentication-modal"
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                          type="button"
                          onClick={handleOnclick}
                        >
                          <svg
                            class="inline-block w-4 h-4 mr-2 stroke-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M16.68 3.316a2.85 2.85 0 00-4.025 0L2.316 12.652a.85.85 0 00-.227.378L1 18l5.97-1.09a.85.85 0 00.378-.227l9.336-9.337a2.85 2.85 0 000-4.025zM5.677 15.323L3.98 16.02l.696-1.697 7.487-7.487 1.697.697-7.487 7.487z" />
                          </svg>
                          Edit
                        </button>
                      )}
                      {isOpen && <EditModal />}
                      <span className="text-sm text-blueGray-400"></span>
                    </div>
                  </div>
                </div>
              </div>

            
                 {  !isOpen && ( <> <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600 mt-5">
                        {tutorData._id}
                      </span>
             <div className="text-center mt-6">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                {tutorData.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {tutorData.email}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  {tutorData.qualification}
                </div>
              </div></>)}
            </div>
          </div>
        </div>
        <footer className="relative  pt-8 pb-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Made with{" "}
                  <a
                    href="https://www.creative-tim.com/product/notus-js"
                    className="text-blueGray-500 hover:text-gray-800"
                    target="_blank"
                  >
                    Notus JS
                  </a>{" "}
                  by{" "}
                  <a
                    href="https://www.creative-tim.com"
                    className="text-blueGray-500 hover:text-blueGray-800"
                    target="_blank"
                  >
                    {" "}
                    Creative Tim
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section> */}

<div class="my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
  <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
    <div class="shrink-0 mr-auto sm:py-3">
        <ToastContainer/>
      <p class="font-medium">Account Details</p>
      {/* <p class="text-sm text-gray-600">Edit your account details</p> */}
    </div>
    {/* <button class="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200">Cancel</button>
    <button class="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-blue-700">Save</button> */}
  </div>
  <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
    <p class="shrink-0 w-32 font-medium">Name</p>
    <input placeholder="First Name"  value={tutorData.name} class="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1" />
   
  </div>
  <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
    <p class="shrink-0 w-32 font-medium">Email</p>
    <input placeholder="your.email@domain.com" value={tutorData.email} class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" />
  </div>
  <div class="flex flex-col gap-4 py-4  lg:flex-row">
    <div class="shrink-0 w-32  sm:py-4">
      <p class="mb-auto font-medium">Avatar</p>
      <p class="text-sm text-gray-600">Change your avatar</p>
    </div>
    <div class="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
      <img src={(tutorData.image)?tutorData.image:"../../../avatar.png"} class="h-16 w-16 rounded-full" />
      <p class="text-sm text-gray-600">Drop your desired image file here to start the upload</p>
      <input 
        onChange={handleImage}
      type="file" 
      class="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1" />
    </div>
  </div>
  <div class="flex justify-end py-4 sm:hidden">
    <button class="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200">Cancel</button>
    <button class="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700">Save</button>
  </div>
</div>

    </div>
  );
}

export default TutorProfile;
