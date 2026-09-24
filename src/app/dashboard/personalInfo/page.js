"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { PiStarFourFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";

export default function PersonalInfo() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(null);

  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    linkedin: "",
    title: "",
    summary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/profile/personalInfo",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200 && response.data.data) {
          setPersonalInfo(response.data.data);

          setInputs({
            fname: response.data.data.fname || "",
            lname: response.data.data.lname || "",
            email: response.data.data.email || "",
            phone: response.data.data.phone || "",
            city: response.data.data.city || "",
            state: response.data.data.state || "",
            country: response.data.data.country || "",
            linkedin: response.data.data.linkedin || "",
            title: response.data.data.title || "",
            summary: response.data.data.summary || "",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      if (personalInfo) {
        const response = await axios.patch(
          `http://localhost:3000/api/profile/personalInfo/${personalInfo._id}`,
          inputs,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          setPersonalInfo(response.data.data);
          toast.success(response.data.message);
        }
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/profile/personalInfo",
          inputs,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 201) {
          setPersonalInfo(response.data.data);
          toast.success(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Oops something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const nextPage = () => {
    setSaving(true);
    router.push("/dashboard/experience");
  };

  if (loading) {
    return (
      <div className="bg-shadowGrey rounded-lg m-5 shadow-sm shadow-shadowGrey text-white min-h-full p-5 flex items-center justify-center">
        <h2 className="text-lavenderGrey opacity-30 text-2xl text-center">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-shadowGrey rounded-lg m-5 shadow-sm shadow-shadowGrey text-white min-h-full p-5 flex flex-col">
      <div className="flex">
        <FaUserCircle className="bg-white shrink-0 rounded-full text-shadowGrey mr-5 text-3xl md:text-5xl" />

        <div className="w-full">
          <h1 className="text-xl md:text-3xl text-white">Personal Info</h1>

          <div className="flex items-center justify-evenly">
            <hr className="border border-lavenderGrey w-full" />
            <PiStarFourFill className="text-2xl text-lavenderGrey m-2" />
            <hr className="border border-lavenderGrey w-full" />
          </div>

          <p className="text-xs md:text-sm">
            <i>
              Add your personal details, contact information, and resume summary.
            </i>
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 m-2 md:m-5 gap-2 md:gap-4"
      >
        <div className="flex flex-col">
          <label
            className="text-lavenderGrey text-md md:text-lg mb-2"
            htmlFor="fname"
          >
            First Name
          </label>
          <input
            onChange={handleChange}
            className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey"
            type="text"
            id="fname"
            name="fname"
            value={inputs.fname}
            placeholder="Enter your first name"
            autoComplete="given-name"
          />
        </div>

        <div className="flex flex-col">
          <label
            className="text-lavenderGrey text-md md:text-lg mb-2"
            htmlFor="lname"
          >
            Last Name
          </label>
          <input
            onChange={handleChange}
            className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey"
            type="text"
            id="lname"
            name="lname"
            value={inputs.lname}
            placeholder="Enter your last name"
            autoComplete="family-name"
          />
        </div>

        <div className="flex flex-col">
          <label
            className="text-lavenderGrey text-md md:text-lg mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            onChange={handleChange}
            className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey"
            type="email"
            id="email"
            name="email"
            value={inputs.email}
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col">
          <label
            className="text-lavenderGrey text-md md:text-lg mb-2"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            onChange={handleChange}
            className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey"
            type="text"
            id="phone"
            name="phone"
            value={inputs.phone}
            placeholder="Enter your phone number"
            autoComplete="tel"
          />
        </div>

        <div className="flex flex-col">
          <label
            className="text-lavenderGrey text-md md:text-lg mb-2"
            htmlFor="city"
          >
            City
          </label>
          <input
            onChange={handleChange}
            className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey"
            type="text"
            id="city"
            name="city"
            value={inputs.city}
            placeholder="Enter your city"
            autoComplete="address-level2"
          />
        </div>

        <div className="flex flex-col">
          <label
            className="text-lavenderGrey text-md md:text-lg mb-2"
            htmlFor="state"
          >
            State
          </label>
          <input
            onChange={handleChange}
            className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey"
            type="text"
            id="state"
            name="state"
            value={inputs.state}
            placeholder="Enter your state"
            autoComplete="address-level1"
          />
        </div>

        <div className="flex flex-col">
          <label
            className="text-lavenderGrey text-md md:text-lg mb-2"
            htmlFor="country"
          >
            Country
          </label>
          <input
            onChange={handleChange}
            className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey"
            type="text"
            id="country"
            name="country"
            value={inputs.country}
            placeholder="Enter your country"
            autoComplete="country-name"
          />
        </div>

        <div className="flex flex-col">
          <label
            className="text-lavenderGrey text-md md:text-lg mb-2"
            htmlFor="linkedin"
          >
            LinkedIn
          </label>
          <input
            onChange={handleChange}
            className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey"
            type="text"
            id="linkedin"
            name="linkedin"
            value={inputs.linkedin}
            placeholder="Enter your LinkedIn URL"
            autoComplete="url"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label
            className="text-lavenderGrey text-md md:text-lg mb-2"
            htmlFor="title"
          >
            Professional Title
          </label>
          <input
            onChange={handleChange}
            className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey"
            type="text"
            id="title"
            name="title"
            value={inputs.title}
            placeholder="Example: Frontend Developer"
            autoComplete="organization-title"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label
            className="text-lavenderGrey text-md md:text-lg mb-2"
            htmlFor="summary"
          >
            Professional Summary
          </label>
          <textarea
            onChange={handleChange}
            className="placeholder:text-vintageGrape placeholder:text-sm md:placeholder:text-md bg-lavenderGrey rounded p-1 md:p-2 text-shadowGrey min-h-[120px]"
            id="summary"
            name="summary"
            value={inputs.summary}
            placeholder="Write a short professional summary"
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2 mt-2">
          <button
            type="submit"
            className="text-white bg-steelBlue hover:bg-vintageGrape rounded-lg p-2"
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : personalInfo
              ? "Update Personal Info"
              : "Add Personal Info"}
          </button>

          <button
            type="button"
            className="text-white bg-steelBlue hover:bg-vintageGrape rounded-lg p-2"
            onClick={nextPage}
          >
            {saving ? "Saving..." : "Save and Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}