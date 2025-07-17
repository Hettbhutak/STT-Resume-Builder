import axios from "axios";


const API_KEY=import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient=axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL+"/api/",
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${API_KEY}`
    }
})


const CreateNewResume=(data)=>axiosClient.post('/resume-users',data);
const GetUserResumes=(userEmail)=>axiosClient.get('/resume-users?filters[userEmail][$eq]='+userEmail);


const UpdateResumeDetail=(id,data)=>axiosClient.put('/resume-users/'+id,data)

const  GetResumeById = (id) =>axiosClient.get('/resume-users/'+id+"?populate=*")

const DeleteResumeById=(id)=>axiosClient.delete('/resume-users/'+id)

export default{
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
}