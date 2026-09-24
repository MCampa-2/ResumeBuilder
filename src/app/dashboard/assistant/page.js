"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { RiRobot2Line } from "react-icons/ri";
import { GoPencil } from "react-icons/go";
import { IoTrophyOutline } from "react-icons/io5";
import { WiStars } from "react-icons/wi";
import { SiGooglegemini } from "react-icons/si";
import { FaLocationArrow } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";

export default function AI() {

    const [getName, setName] = useState("");
    const [prompt, setPrompt] = useState("");
    const [aiResponse, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);


    // GET USER
    useEffect(() => {

        const getUser = async () => {

            try {

                const response = await axios.get("/api/user", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.status === 200) {
                    setName(response.data.data.fname);
                }

            } catch (error) {
                console.log(error);
            }
        };

        getUser();

    }, []);


    // HANDLE TEXTAREA
    const handleChange = (e) => {
        setPrompt(e.target.value);
    };


    // HANDLE FORM
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!prompt.trim()) {
            toast.error("Please enter a question.");
            return;
        }

        await resumeTips(prompt);
    };


    // ASK GEMINI
    const resumeTips = async (question) => {

        if (loading) return;

        try {

            setLoading(true);
            setResponse(null);

            const response = await axios.post(
                "/api/ai",
                {
                    prompt: question,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.status === 200) {

                console.log(response.data);

                setResponse(response.data);

                toast.success("Resume advice ready!");
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Oops, something went wrong."
            );

        } finally {

            setLoading(false);

        }
    };


    // EXAMPLE QUESTION
    const askExample = (question) => {

        setPrompt(question);

        resumeTips(question);
    };


    return (

        <div className="w-full min-h-full p-2 sm:p-3 lg:p-4">


            {/* HEADER */}

            <div className="w-full mb-3 rounded-lg p-3 sm:p-4 shadow-sm shadow-gray-500">

                <div
                    className="
                        flex
                        flex-col
                        gap-3
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    <div className="flex items-start sm:items-center gap-2">

                        <WiStars
                            className="
                                text-steelBlue
                                text-2xl
                                sm:text-3xl
                                shrink-0
                            "
                        />

                        <div
                            className="
                                flex
                                flex-col
                                sm:flex-row
                                sm:items-center
                                sm:gap-2
                            "
                        >

                            <h1
                                className="
                                    text-xl
                                    sm:text-2xl
                                    text-vintageGrape
                                    font-semibold
                                "
                            >
                                AI Resume Assistant
                            </h1>

                            <p
                                className="
                                    text-sm
                                    sm:text-lg
                                    lg:text-xl
                                    text-vintageGrape
                                "
                            >
                                Ask any question {getName}!
                            </p>

                        </div>

                    </div>


                    <div
                        className="
                            flex
                            items-center
                            w-fit
                            bg-gray-50
                            px-3
                            py-2
                            rounded-lg
                        "
                    >

                        <SiGooglegemini
                            className="
                                text-steelBlue
                                mr-2
                                shrink-0
                            "
                        />

                        <p
                            className="
                                text-sm
                                sm:text-base
                                lg:text-lg
                                text-vintageGrape
                            "
                        >
                            Powered by Gemini
                        </p>

                    </div>

                </div>


                <p
                    className="
                        text-xs
                        sm:text-sm
                        text-vintageGrape
                        mt-3
                        leading-relaxed
                    "
                >
                    Get personalized advice, suggestions and feedback to
                    make your resume the best it can be.
                </p>

            </div>


            {/* QUESTION FORM */}

            <form
                onSubmit={handleSubmit}
                className="
                    shadow-sm
                    shadow-gray-500
                    p-3
                    sm:p-4
                    w-full
                    mb-3
                    rounded-lg
                "
            >

                <p
                    className="
                        font-bold
                        text-vintageGrape
                        text-sm
                        sm:text-base
                        mb-3
                    "
                >
                    Ask a question or request feedback about your resume
                </p>


                {/* EXAMPLES */}

                <div className="mb-4">

                    <p
                        className="
                            text-vintageGrape
                            text-xs
                            sm:text-sm
                            mb-2
                        "
                    >
                        Examples:
                    </p>


                    <div className="flex flex-wrap gap-2">

                        <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                askExample("Improve my summary")
                            }
                            className="
                                text-vintageGrape
                                text-xs
                                sm:text-sm
                                bg-gray-200
                                px-3
                                py-2
                                rounded-lg
                                hover:bg-gray-300
                                disabled:opacity-50
                                transition
                            "
                        >
                            Improve my summary
                        </button>


                        <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                askExample("Make it ATS friendly")
                            }
                            className="
                                text-vintageGrape
                                text-xs
                                sm:text-sm
                                bg-gray-200
                                px-3
                                py-2
                                rounded-lg
                                hover:bg-gray-300
                                disabled:opacity-50
                                transition
                            "
                        >
                            Make it ATS friendly
                        </button>


                        <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                askExample("Suggest skills")
                            }
                            className="
                                text-vintageGrape
                                text-xs
                                sm:text-sm
                                bg-gray-200
                                px-3
                                py-2
                                rounded-lg
                                hover:bg-gray-300
                                disabled:opacity-50
                                transition
                            "
                        >
                            Suggest skills
                        </button>


                        <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                askExample("Review my resume")
                            }
                            className="
                                text-vintageGrape
                                text-xs
                                sm:text-sm
                                bg-gray-200
                                px-3
                                py-2
                                rounded-lg
                                hover:bg-gray-300
                                disabled:opacity-50
                                transition
                            "
                        >
                            Review my resume
                        </button>

                    </div>

                </div>


                {/* TEXTAREA */}

                <textarea
                    onChange={handleChange}
                    value={prompt}
                    disabled={loading}
                    className="
                        outline-none
                        border
                        border-gray-200
                        focus:border-steelBlue
                        w-full
                        rounded-lg
                        placeholder:text-lavenderGrey
                        resize-none
                        min-h-28
                        sm:min-h-32
                        p-3
                        text-sm
                        sm:text-base
                        disabled:opacity-50
                    "
                    placeholder="Type your question here..."
                />


                <p
                    className="
                        my-2
                        text-xs
                        sm:text-sm
                        text-vintageGrape
                        leading-relaxed
                    "
                >
                    <i>
                        For example: How can I make my resume stronger
                        to become more desirable to land a frontend
                        developer role?
                    </i>
                </p>


                {/* SUBMIT */}

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        bg-steelBlue
                        p-2
                        sm:px-4
                        sm:py-2
                        rounded-md
                        flex
                        items-center
                        justify-center
                        w-full
                        sm:w-fit
                        sm:ml-auto
                        mt-3
                        hover:opacity-90
                        disabled:opacity-50
                        transition
                    "
                >

                    {loading ? (

                        <>

                            <IoReloadOutline
                                className="
                                    text-white
                                    text-lg
                                    animate-spin
                                "
                            />

                            <span
                                className="
                                    pl-2
                                    text-white
                                    text-sm
                                    sm:text-base
                                "
                            >
                                Analyzing Resume...
                            </span>

                        </>

                    ) : (

                        <>

                            <FaLocationArrow
                                className="
                                    text-white
                                    text-lg
                                "
                            />

                            <span
                                className="
                                    pl-2
                                    text-white
                                    text-sm
                                    sm:text-base
                                "
                            >
                                Get Advice
                            </span>

                        </>

                    )}

                </button>

            </form>


            {/* AI RESPONSE */}

            <div
                className="
                    shadow-gray-500
                    shadow-sm
                    p-3
                    sm:p-4
                    w-full
                    rounded-lg
                    overflow-hidden
                "
            >


                {/* RESPONSE HEADER */}

                <div
                    className="
                        flex
                        flex-col
                        gap-2
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        border-b
                        border-gray-200
                        pb-3
                    "
                >

                    <div>

                        <div className="flex items-center">

                            <WiStars
                                className="
                                    text-steelBlue
                                    text-xl
                                    sm:text-2xl
                                    mr-2
                                    shrink-0
                                "
                            />

                            <h1
                                className="
                                    font-bold
                                    text-vintageGrape
                                    text-base
                                    sm:text-lg
                                "
                            >
                                AI Response
                            </h1>

                        </div>


                        <p
                            className="
                                text-vintageGrape
                                text-xs
                                sm:text-sm
                                mt-1
                                leading-relaxed
                            "
                        >
                            Here are personalized suggestions based on
                            your resume and question.
                        </p>

                    </div>


                    {aiResponse && (

                        <div
                            className="
                                flex
                                items-center
                                text-xs
                                sm:text-sm
                                text-steelBlue
                                shrink-0
                            "
                        >

                            <SiGooglegemini className="mr-1" />

                            Gemini

                        </div>

                    )}

                </div>


                {/* EMPTY STATE */}

                {!aiResponse && !loading && (

                    <div
                        className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                            py-10
                            sm:py-12
                            px-3
                        "
                    >

                        <RiRobot2Line
                            className="
                                text-4xl
                                sm:text-5xl
                                text-lavenderGrey
                                mb-3
                            "
                        />

                        <p
                            className="
                                text-vintageGrape
                                font-semibold
                                text-sm
                                sm:text-base
                            "
                        >
                            Ask your AI Resume Assistant
                        </p>

                        <p
                            className="
                                text-xs
                                sm:text-sm
                                text-lavenderGrey
                                mt-1
                            "
                        >
                            Your personalized resume feedback will
                            appear here.
                        </p>

                    </div>

                )}


                {/* LOADING */}

                {loading && (

                    <div
                        className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                            py-10
                            sm:py-12
                            px-3
                        "
                    >

                        <IoReloadOutline
                            className="
                                text-3xl
                                sm:text-4xl
                                text-steelBlue
                                animate-spin
                                mb-3
                            "
                        />

                        <p
                            className="
                                font-semibold
                                text-vintageGrape
                                text-sm
                                sm:text-base
                            "
                        >
                            Analyzing your resume...
                        </p>

                        <p
                            className="
                                text-xs
                                sm:text-sm
                                text-lavenderGrey
                                mt-1
                            "
                        >
                            Gemini is reviewing your resume and question.
                        </p>

                    </div>

                )}


                {/* AI RESULTS */}

                {aiResponse && !loading && aiResponse.message && (

                    <div className="mt-4">

                        <div
                            className="
                                border
                                border-gray-200
                                rounded-lg
                                p-3
                                sm:p-4
                                mb-4
                                overflow-hidden
                            "
                        >


                            {/* CATEGORY */}

                            <div className="flex items-center mb-4">

                                <div
                                    className="
                                        bg-gray-100
                                        p-2
                                        rounded-lg
                                        mr-3
                                        shrink-0
                                    "
                                >

                                    <GoPencil
                                        className="
                                            text-steelBlue
                                            text-base
                                            sm:text-lg
                                        "
                                    />

                                </div>


                                <div className="min-w-0">

                                    <p
                                        className="
                                            text-[10px]
                                            sm:text-xs
                                            text-lavenderGrey
                                            uppercase
                                            tracking-wide
                                        "
                                    >
                                        Category
                                    </p>

                                    <h2
                                        className="
                                            font-bold
                                            text-vintageGrape
                                            text-base
                                            sm:text-lg
                                            break-words
                                        "
                                    >
                                        {aiResponse.message.category}
                                    </h2>

                                </div>

                            </div>


                            {/* QUESTION */}

                            <div
                                className="
                                    bg-gray-100
                                    rounded-lg
                                    p-3
                                    mb-5
                                "
                            >

                                <p
                                    className="
                                        text-[10px]
                                        sm:text-xs
                                        text-lavenderGrey
                                        uppercase
                                        tracking-wide
                                        mb-1
                                    "
                                >
                                    Your Question
                                </p>

                                <p
                                    className="
                                        text-vintageGrape
                                        text-sm
                                        sm:text-base
                                        leading-relaxed
                                        break-words
                                    "
                                >
                                    {aiResponse.message.question}
                                </p>

                            </div>


                            {/* IMPROVEMENTS */}

                            <div>

                                <div className="flex items-center mb-3">

                                    <IoTrophyOutline
                                        className="
                                            text-steelBlue
                                            text-lg
                                            sm:text-xl
                                            mr-2
                                            shrink-0
                                        "
                                    />

                                    <h3
                                        className="
                                            font-semibold
                                            text-vintageGrape
                                            text-sm
                                            sm:text-base
                                        "
                                    >
                                        Suggested Improvements
                                    </h3>

                                </div>


                                <div className="space-y-2">

                                    {Array.isArray(
                                        aiResponse.message.improvements
                                    ) &&
                                        aiResponse.message.improvements.map(
                                            (improvement, index) => (

                                                <div
                                                    key={index}
                                                    className="
                                                        flex
                                                        items-start
                                                        bg-gray-50
                                                        p-3
                                                        rounded-lg
                                                        border
                                                        border-gray-100
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            bg-steelBlue
                                                            text-white
                                                            text-xs
                                                            rounded-full
                                                            min-w-6
                                                            w-6
                                                            h-6
                                                            flex
                                                            items-center
                                                            justify-center
                                                            mr-3
                                                            mt-0.5
                                                            shrink-0
                                                        "
                                                    >
                                                        {index + 1}
                                                    </div>


                                                    <p
                                                        className="
                                                            text-vintageGrape
                                                            text-xs
                                                            sm:text-sm
                                                            leading-relaxed
                                                            break-words
                                                            min-w-0
                                                        "
                                                    >
                                                        {improvement}
                                                    </p>

                                                </div>

                                            )
                                        )
                                    }

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}