"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { PiStarFourFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



export default function Certification(){

    const router = useRouter();


    const [submitting, setSubmitting] = useState(false);

    const [inputs,setInputs] = useState({
        certificationName: "",
        issuingOrganization: "",
        issueDate: "",
        expirationDate: "",
        doesNotExpire: false,
        credentialId: "",
        credentialUrl: ""
    });

    const [loading, setLoading] = useState(true)

    const [editData, setEditData] = useState([]);

   

    const [selectedCert, setSelectedCert] = useState();

    const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setInputs(values => ({...values, [name]: value}))

    if(target.checked){
        inputs.expirationDate = "";
        inputs.doesNotExpire = true;
       
    }
    if(!target.checked){
        inputs.doesNotExpire = false;
    }
  }

    const [saving, setSaving] = useState(false);

    const nextPage = () =>{
        setSaving(true);
        router.push("/dashboard/projects");
    }



    const handleSubmit = async (e) =>{
        try{
            setSubmitting(true);
            e.preventDefault();
           
            if(selectedCert){
                const response = await axios.patch(`http://localhost:3000/api/profile/certifications/${selectedCert._id}`,inputs, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if(response.status === 200){
                    
                    setEditData((cert) =>{
                        return cert.map((x) =>{
                            if(x._id === selectedCert._id){
                                return response.data.data
                            }
                            return x;
                        })
                    })
                        
                    setInputs({
                        certificationName: "",
                        issuingOrganization: "",
                        issueDate: "",
                        expirationDate: "",
                        doesNotExpire: false,
                        credentialId: "",
                        credentialUrl: ""
                    })
                    toast.success(response.data.message);
                }
            }else{ 
                const response = await axios.post("http://localhost:3000/api/profile/certifications", inputs, {
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if(response.status === 201){
                const oldArr = editData;
                const newArr = [...oldArr, response.data.data];
                setEditData(newArr)
                toast.success(response.data.message);
                setInputs({
                    certificationName: "",
                    issuingOrganization: "",
                    issueDate: "",
                    expirationDate: "",
                    doesNotExpire: false,
                    credentialId: "",
                    credentialUrl: ""
                });
            }
        }



        }catch(error){
            if(error.response){
                toast.error(error?.response?.data?.message || "Oops something went wrong")
            }

        }finally{
            setSubmitting(false);
        }
    }

    useEffect(() =>{
        const getData = async () =>{
            try{
                const response = await axios.get("http://localhost:3000/api/profile/certifications",{
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if(response.status === 200){
                    
                    setEditData(response.data.data)
                }

            }catch(error){
                console.log(error)
            }finally{
                setLoading(false);
            }
        }

        getData();

    },[])


    const deleteCertificate = async (id) =>{
        try{
            const response = await axios.delete(`http://localhost:3000/api/profile/certifications/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if(response.status === 200){
                const newArr = editData.filter((x,i) => {
                    return x._id !== id
                });
                setEditData(newArr)
                toast.success(response.data.message);
            }

        }catch(error){
            if(error.response){
                toast.error(error?.response?.data?.message || "Oops something went wrong")
            }
        }
    }

    const getSelectedCertificate = async (x) =>{

            const sDate = new Date(x.issueDate);
            const sNewDate = sDate.toISOString().split("T")[0];

            const eDate = new Date(x.expirationDate);
            const eNewDate = eDate.toISOString().split("T")[0];

        setInputs({
            certificationName: x.certificationName || "",
            issuingOrganization: x.issuingOrganization || "",
            issueDate: sNewDate || "",
            expirationDate: eNewDate || "",
            doesNotExpire: x.doesNotExpire || "",
            credentialId: x.credentialId || "",
            credentialUrl: x.credentialUrl || ""
        });
        
        setSelectedCert(x);
    }

      const convertDate = (param) =>{
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let d = new Date(param);
        let month = months[d.getMonth()];
        let  year = d.getFullYear();
        return month + ", " + year;
    }


         return(
                   <div  className="bg-shadowGrey rounded-lg m-5 shadow-sm shadow-shadowGrey text-white min-h-full p-5 flex flex-col">
                           
                           <div className="flex">
                               <FaUserCircle className="bg-white shrink-0 rounded-full text-shadowGrey mr-5 text-3xl md:text-5xl"/>
                               <div className="w-full">
                                   <h1 className="text-xl md:text-3xl text-white">Certifications</h1>
                                   <div className="flex items-center justify-evenly">
                                       <hr className="border border-lavenderGrey w-full"></hr>
                                       <PiStarFourFill className="text-2xl text-lavenderGrey m-2"></PiStarFourFill>
                                       <hr className="border border-lavenderGrey w-full"></hr>
                                   </div>
                                   <p className="text-xs md:text-sm"><i>Display certifications that prove your skills and industry knowledge.</i></p>
                               </div>
                           </div>
           
                           <form onSubmit={handleSubmit} className="grid grid-cols-1 m-2 md:m-5 gap-2 md:gap-4">
                                 <div className="flex flex-col">
                                    <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="certificationName">Certification</label>
                                    <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="certificationName" name="certificationName" value={inputs.certificationName} placeholder="Enter your certification name" autoComplete="certification-name"></input>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="issuingOrganization">Issuing Organization</label>
                                    <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="issuingOrganization" name="issuingOrganization" value={inputs.issuingOrganization} placeholder="Enter organization name" autoComplete="organization-name"></input>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="issueDate">Issue Date</label>
                                    <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="date" id="issueDate" name="issueDate" value={inputs.issueDate} placeholder="Enter the date it was issued" autoComplete="issued-date"></input>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="expirationDate">Expiration Date (Optional)</label>
                                    <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="date" id="expirationDate" name="expirationDate" value={inputs.expirationDate} placeholder="Enter the expiration date" autoComplete="expiration-date" disabled={inputs.doesNotExpire}></input>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="doesNotExpire">Does not expire</label>
                                    <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="checkbox" id="doesNotExpire" name="doesNotExpire" checked={inputs.doesNotExpire}  autoComplete="does-not-expire"></input>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="credentialId">Credential Id</label>
                                    <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="credentialId" name="credentialId" value={inputs.credentialId} placeholder="Enter your credential id" autoComplete="credential-id"></input>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-lavenderGrey text-md md:text-lg mb-2" htmlFor="credentialUrl">Credential URL</label>
                                    <input onChange={handleChange} className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey" type="text" id="credential URL" name="credentialUrl" value={inputs.credentialUrl} placeholder="Enter your credential url" autoComplete="credential-url"></input>
                                </div>
                                <div className="flex flex-col gap-2">
                            <button type="submit" className="text-white bg-steelBlue hover:bg-vintageGrape rounded-lg p-2" disabled={submitting}>{submitting ? "Submitting...": selectedCert ? 'Update Certificate':"Add Certificate"}</button>
                            <button  type="button" className="text-white bg-steelBlue hover:bg-vintageGrape rounded-lg p-2" onClick={nextPage}>{saving ? "Saving...": "Save and Continue"}</button>
                        </div>
                           </form>
                            <div className="w-full">
                                   <h2 className="text-xl md:text-2xl text-white text-center mt-5">Your Certifications</h2>
                                   <div className="flex items-center justify-evenly">
                                       <hr className="border border-lavenderGrey w-full"></hr>
                                       <PiStarFourFill className="text-2xl text-lavenderGrey m-2"></PiStarFourFill>
                                       <hr className="border border-lavenderGrey w-full"></hr>
                                   </div>
                            </div>
                            <div className={`grid ${editData ? "grid-cols-2": "grid-cols-1"}`}>
                                {loading ? <h2 className="text-lavenderGrey opacity-30 text-2xl text-center mt-7 md:mt-0">Loading...</h2>: editData ? editData.map((x,i) =>{
                                    return(
                                    <div className="bg-vintageGrape m-1 p-2 rounded-lg flex items-start" key={i}>
                                    <FaSuitcase className="text-xl md:text-2xl m-2 text-lavenderGrey" />
                                    <div className="m-1">
                                        <h3 className="text-md md:text-lg">{x.certificationName}</h3>
                                        <p className="text-lavenderGrey text-sm md:text-md first-letter:uppercase">{x.issuingOrganization}</p>
                                        <div className="flex items-center gap-1">
                                            <p className="text-xs md:text-md">{convertDate(x.issueDate)} -</p>
                                            <p className="text-xs md:text-md">{x.doesNotExpire ? "Does not expire" :convertDate(x.expirationDate)}</p>
                                            
                                        </div>
                                        <p className="text-white text-xs md:text-sm">{x.credentialId}</p>
                                        <p className="text-white text-xs md:text-sm">{x.credentialUrl}</p>
                                    </div>
                                    <div className="flex items-center justify-center ml-auto m-2 gap-1 md:gap2">
                                        <FaEdit className="text-lavenderGrey cursor-pointer text-lg md:text-xl" onClick={() => getSelectedCertificate(x)}/>
                                        <MdDelete className="text-red-950 cursor-pointer text-xl md:text-xl" onClick={() => deleteCertificate(x._id)}/>
                                    </div>
                                </div>
                                )
                                }):<h2 className="text-lavenderGrey opacity-30 text-2xl text-center mt-7 md:mt-0">No Data</h2>}
                            </div>
                      
                   </div>
               )
        }
