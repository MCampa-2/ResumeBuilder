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

export default function Education() {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [inputs, setInputs] = useState({
        schoolName: "",
        degree: "",
        startDate: "",
        endDate: "",
        current: false
    });

    const [educationData, setEducationData] = useState([]);

    const [editForm, setEditForm] = useState(null);

    const [checkStatus, setCheckStatus] = useState(false);


    // ==========================================
    // EDIT EDUCATION
    // ==========================================

    const editData = (x) => {

        const sDate = new Date(x.startDate);
        const sNewDate = sDate.toISOString().split("T")[0];

        let eNewDate = "";

        if (x.endDate) {
            const eDate = new Date(x.endDate);
            eNewDate = eDate.toISOString().split("T")[0];
        }

        setEditForm(x);

        setInputs({
            schoolName: x.schoolName || "",
            degree: x.degree || "",
            startDate: sNewDate || "",
            endDate: eNewDate || "",
            current: x.current || false
        });

        setCheckStatus(x.current || false);
    };


    // ==========================================
    // HANDLE INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        const target = e.target;

        const value =
            target.type === "checkbox"
                ? target.checked
                : target.value;

        const name = target.name;

        setInputs((values) => {

            const updatedValues = {
                ...values,
                [name]: value
            };

            if (name === "current" && value === true) {
                updatedValues.endDate = "";
            }

            return updatedValues;
        });

        if (name === "current") {
            setCheckStatus(value);
        }
    };


    // ==========================================
    // DATE CONVERTER
    // ==========================================

    const convertDate = (param) => {

        if (!param) {
            return "";
        }

        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const d = new Date(param);

        const month = months[d.getMonth()];
        const year = d.getFullYear();

        return month + ", " + year;
    };


    // ==========================================
    // NEXT PAGE
    // ==========================================

    const nextPage = () => {

        setSubmitting(true);

        setTimeout(() => {
            router.push("/dashboard/skills");
        }, 2000);
    };


    // ==========================================
    // ADD / UPDATE EDUCATION
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // ----------------------------------
            // UPDATE EXISTING EDUCATION
            // ----------------------------------

            if (editForm) {

                const response = await axios.patch(
                    `/api/profile/education/${editForm._id}`,
                    inputs,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (response.status === 200) {

                    toast.success(response.data.message);

                    setEducationData((previousEducation) => {

                        return previousEducation.map((item) => {

                            if (item._id === editForm._id) {
                                return response.data.data;
                            }

                            return item;
                        });
                    });

                    setInputs({
                        schoolName: "",
                        degree: "",
                        startDate: "",
                        endDate: "",
                        current: false
                    });

                    setEditForm(null);
                    setCheckStatus(false);
                }

                return;
            }


            // ----------------------------------
            // ADD NEW EDUCATION
            // ----------------------------------

            const response = await axios.post(
                "/api/profile/education",
                inputs,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`
                    }
                }
            );

            if (response.status === 201) {

                setEducationData((previousEducation) => [
                    ...previousEducation,
                    response.data.data
                ]);

                toast.success(response.data.message);

                setInputs({
                    schoolName: "",
                    degree: "",
                    startDate: "",
                    endDate: "",
                    current: false
                });

                setCheckStatus(false);
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Oops something went wrong"
            );
        }
    };


    // ==========================================
    // GET EDUCATION
    // ==========================================

    useEffect(() => {

        const getEducationInfo = async () => {

            try {

                const response = await axios.get(
                    "/api/profile/education",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`
                        }
                    }
                );

                if (response.status === 200) {
                    setEducationData(response.data.data);
                }

            } catch (error) {

                console.log(error);

                toast.error(
                    error?.response?.data?.message ||
                    "Oops something went wrong"
                );

            } finally {

                setLoading(false);
            }
        };

        getEducationInfo();

    }, []);


    // ==========================================
    // DELETE EDUCATION
    // ==========================================

    const deleteEducation = async (id) => {

        try {

            const response = await axios.delete(
                `/api/profile/education/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`
                    }
                }
            );

            if (response.status === 200) {

                setEducationData((previousEducation) => {

                    return previousEducation.filter((item) => {
                        return item._id !== id;
                    });
                });

                toast.success(response.data.message);
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Oops something went wrong"
            );
        }
    };


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div
            className="
                bg-shadowGrey
                rounded-lg
                m-2
                md:m-5
                shadow-sm
                shadow-shadowGrey
                text-white
                min-h-full
                p-3
                md:p-5
                flex
                flex-col
            "
        >

            {/* ================================== */}
            {/* HEADER */}
            {/* ================================== */}

            <div className="flex">

                <FaUserCircle
                    className="
                        bg-white
                        shrink-0
                        rounded-full
                        text-shadowGrey
                        mr-3
                        md:mr-5
                        text-3xl
                        md:text-5xl
                    "
                />

                <div className="w-full">

                    <h1 className="text-xl md:text-3xl text-white">
                        Education
                    </h1>

                    <div className="flex items-center justify-evenly">

                        <hr className="border border-lavenderGrey w-full" />

                        <PiStarFourFill
                            className="
                                text-2xl
                                text-lavenderGrey
                                m-2
                                shrink-0
                            "
                        />

                        <hr className="border border-lavenderGrey w-full" />

                    </div>

                    <p className="text-xs md:text-sm">
                        <i>
                            Add your educational experience, degrees,
                            and achievements to build a stronger
                            professional profile.
                        </i>
                    </p>

                </div>

            </div>


            {/* ================================== */}
            {/* FORM */}
            {/* ================================== */}

            <form
                onSubmit={handleSubmit}
                className="
                    grid
                    grid-cols-1
                    m-2
                    md:m-5
                    gap-2
                    md:gap-4
                "
            >

                {/* SCHOOL */}

                <div className="flex flex-col">

                    <label
                        className="
                            text-lavenderGrey
                            text-md
                            md:text-lg
                            mb-2
                        "
                        htmlFor="schoolName"
                    >
                        School
                    </label>

                    <input
                        onChange={handleChange}
                        className="
                            placeholder:text-vintageGrape
                            placeholder:text-sm
                            md:placeholder:text-md
                            bg-lavenderGrey
                            rounded
                            p-2
                            text-shadowGrey
                            outline-none
                        "
                        type="text"
                        id="schoolName"
                        name="schoolName"
                        value={inputs.schoolName}
                        required
                        placeholder="Enter your school name"
                        autoComplete="organization"
                    />

                </div>


                {/* DEGREE */}

                <div className="flex flex-col">

                    <label
                        className="
                            text-lavenderGrey
                            text-md
                            md:text-lg
                            mb-2
                        "
                        htmlFor="degree"
                    >
                        Degree
                    </label>

                    <input
                        onChange={handleChange}
                        className="
                            placeholder:text-vintageGrape
                            placeholder:text-sm
                            md:placeholder:text-md
                            bg-lavenderGrey
                            rounded
                            p-2
                            text-shadowGrey
                            outline-none
                        "
                        type="text"
                        id="degree"
                        name="degree"
                        value={inputs.degree}
                        required
                        placeholder="Enter your degree"
                        autoComplete="off"
                    />

                </div>


                {/* START DATE */}

                <div className="flex flex-col">

                    <label
                        className="
                            text-lavenderGrey
                            text-md
                            md:text-lg
                            mb-2
                        "
                        htmlFor="startDate"
                    >
                        Start Date
                    </label>

                    <input
                        onChange={handleChange}
                        className="
                            bg-lavenderGrey
                            rounded
                            p-2
                            text-shadowGrey
                            outline-none
                        "
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={inputs.startDate}
                        required
                    />

                </div>


                {/* END DATE */}

                <div className="flex flex-col">

                    <label
                        className="
                            text-lavenderGrey
                            text-md
                            md:text-lg
                            mb-2
                        "
                        htmlFor="endDate"
                    >
                        End Date (Optional)
                    </label>

                    <input
                        onChange={handleChange}
                        className="
                            bg-lavenderGrey
                            rounded
                            p-2
                            text-shadowGrey
                            outline-none
                            disabled:opacity-50
                        "
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={inputs.endDate}
                        disabled={checkStatus}
                    />

                </div>


                {/* CURRENT */}

                <div className="flex items-center gap-2">

                    <label
                        className="
                            text-lavenderGrey
                            text-md
                            md:text-lg
                        "
                        htmlFor="current"
                    >
                        Currently Attending
                    </label>

                    <input
                        onChange={handleChange}
                        className="
                            mt-1
                            rounded
                            bg-vintageLavender
                            text-shadowGrey
                        "
                        type="checkbox"
                        id="current"
                        name="current"
                        checked={inputs.current}
                    />

                </div>


                {/* BUTTONS */}

                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-2
                ">

                    <button
                        type="submit"
                        className="
                            text-white
                            bg-steelBlue
                            hover:bg-vintageGrape
                            rounded-lg
                            p-2
                            w-full
                        "
                    >
                        {editForm
                            ? "Update Education"
                            : "Add Education"}
                    </button>

                    <button
                        onClick={nextPage}
                        type="button"
                        className="
                            text-white
                            bg-steelBlue
                            hover:bg-vintageGrape
                            rounded-lg
                            p-2
                            w-full
                            disabled:opacity-50
                        "
                        disabled={submitting}
                    >
                        {submitting
                            ? "Saving..."
                            : "Save and Continue"}
                    </button>

                </div>

            </form>


            {/* ================================== */}
            {/* EDUCATION LIST HEADER */}
            {/* ================================== */}

            <div className="w-full">

                <h2 className="
                    text-xl
                    md:text-2xl
                    text-white
                    text-center
                    mt-5
                ">
                    Your Education
                </h2>

                <div className="flex items-center justify-evenly">

                    <hr className="border border-lavenderGrey w-full" />

                    <PiStarFourFill
                        className="
                            text-2xl
                            text-lavenderGrey
                            m-2
                            shrink-0
                        "
                    />

                    <hr className="border border-lavenderGrey w-full" />

                </div>

            </div>


            {/* ================================== */}
            {/* EDUCATION LIST */}
            {/* ================================== */}

            <div
                className={`
                    grid
                    gap-2
                    ${
                        educationData.length === 0
                            ? "grid-cols-1"
                            : "grid-cols-1 md:grid-cols-2"
                    }
                `}
            >

                {loading ? (

                    <h2 className="
                        text-lavenderGrey
                        opacity-30
                        text-xl
                        md:text-2xl
                        text-center
                        mt-7
                        col-span-full
                    ">
                        Loading...
                    </h2>

                ) : educationData.length === 0 ? (

                    <h2 className="
                        text-lavenderGrey
                        opacity-30
                        text-xl
                        md:text-2xl
                        text-center
                        mt-7
                        col-span-full
                    ">
                        No Data
                    </h2>

                ) : (

                    educationData.map((x) => (

                        <div
                            className="
                                bg-vintageGrape
                                p-3
                                rounded-lg
                                flex
                                items-start
                                min-w-0
                            "
                            key={x._id}
                        >

                            <FaSuitcase
                                className="
                                    text-xl
                                    md:text-2xl
                                    m-2
                                    text-lavenderGrey
                                    shrink-0
                                "
                            />

                            <div className="m-1 min-w-0">

                                <h3 className="
                                    text-md
                                    md:text-lg
                                    break-words
                                ">
                                    {x.schoolName}
                                </h3>

                                <p className="
                                    text-lavenderGrey
                                    text-sm
                                    md:text-md
                                    first-letter:uppercase
                                    break-words
                                ">
                                    {x.degree}
                                </p>

                                <div className="
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-1
                                ">

                                    <p className="text-xs md:text-md">
                                        {convertDate(x.startDate)} -
                                    </p>

                                    <p className="text-xs md:text-md">
                                        {x.current
                                            ? "Present"
                                            : convertDate(x.endDate)}
                                    </p>

                                </div>

                            </div>


                            {/* ACTIONS */}

                            <div className="
                                flex
                                items-center
                                justify-center
                                ml-auto
                                m-2
                                gap-2
                                shrink-0
                            ">

                                <FaEdit
                                    className="
                                        text-lavenderGrey
                                        cursor-pointer
                                        text-lg
                                        md:text-xl
                                        hover:opacity-70
                                    "
                                    onClick={() => editData(x)}
                                />

                                <MdDelete
                                    className="
                                        text-red-950
                                        cursor-pointer
                                        text-xl
                                        hover:opacity-70
                                    "
                                    onClick={() =>
                                        deleteEducation(x._id)
                                    }
                                />

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}