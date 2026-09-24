"use client";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import Image from "next/image";
import { useContext, useRef } from "react";
import { TemplateContext } from "../app/context/TemplateContext";
import { FaCheck } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


export default function ClassicResume({ data }) {
  if (!data) return null;

  const { personalInfo, experience, education, projects, skill, cert } = data;

  const fullName = `${personalInfo?.fname || ""} ${personalInfo?.lname || ""}`;

  const convertDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  };



  return (
    <div className="bg-white text-black p-5 text-xs leading-tight">

      {/* Header */}
      <h1 className="text-xl text-center font-bold">{fullName}</h1>
      <h2 className="text-center uppercase text-vintageLavender font-semibold m-1">
        {personalInfo?.title}
      </h2>

      {/* Contact */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-[11px]">
        {personalInfo?.email && <p>{personalInfo.email}</p>}
        {personalInfo?.phone && <p>{personalInfo.phone}</p>}
        {personalInfo?.state && <p>{personalInfo.state}</p>}
        {personalInfo?.linkedin && <p>{personalInfo.linkedin}</p>}
      </div>

      <hr className="border-black my-2" />

      {/* Summary */}
      {personalInfo?.summary && (
        <section>
          <h3 className="uppercase font-semibold text-vintageLavender">
            Professional Summary
          </h3>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <>
          <hr className="border-black my-2" />
          <section>
            <h3 className="uppercase font-semibold text-vintageLavender">
              Experience
            </h3>

            {experience.map((x, i) => (
              <div key={i} className="mt-1">
                <div className="flex justify-between gap-2">
                  <p>
                    <span className="font-semibold">{x.title}</span>
                    {x.company && <span> - <i>{x.company}</i></span>}
                  </p>

                  <p className="whitespace-nowrap text-[11px]">
                    {convertDate(x.startDate)} - {x.current ? "Present" : convertDate(x.endDate)}
                  </p>
                </div>

                {x.description && (
                  <ul className="list-disc ml-5">
                    <li>{x.description}</li>
                  </ul>
                )}
              </div>
            ))}
          </section>
        </>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <>
          <hr className="border-black my-2" />
          <section>
            <h3 className="uppercase font-semibold text-vintageLavender">
              Projects
            </h3>

            {projects.map((x, i) => (
              <div key={i} className="mt-1">
                <p className="font-semibold">{x.projectName}</p>

                {x.description && (
                  <ul className="list-disc ml-5">
                    <li>{x.description}</li>
                  </ul>
                )}

                {x.technologies?.length > 0 && (
                  <p className="text-[11px]">
                    <span className="font-semibold">Technologies: </span>
                    {x.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </section>
        </>
      )}

      {/* Education + Skills */}
      {(education?.length > 0 || skill) && (
        <>
          <hr className="border-black my-2" />

          <div className="grid grid-cols-2 gap-4">
            {education?.length > 0 && (
              <section>
                <h3 className="uppercase text-vintageLavender font-semibold">
                  Education
                </h3>

                {education.map((x, i) => (
                  <div key={i} className="mt-1">
                    <p className="font-semibold">{x.schoolName}</p>
                    {x.degree && <p>{x.degree}</p>}
                    <p className="text-[11px]">
                      {convertDate(x.startDate)} - {x.current ? "Present" : convertDate(x.endDate)}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {skill && (
              <section>
                <h3 className="uppercase text-vintageLavender font-semibold">
                  Skills
                </h3>

                {skill.technicalSkills?.length > 0 && (
                  <p>
                    <span className="font-semibold">Technical: </span>
                    {skill.technicalSkills.join(", ")}
                  </p>
                )}

                {skill.softSkills?.length > 0 && (
                  <p>
                    <span className="font-semibold">Soft: </span>
                    {skill.softSkills.join(", ")}
                  </p>
                )}

                {skill.strengths?.length > 0 && (
                  <p>
                    <span className="font-semibold">Strengths: </span>
                    {skill.strengths.join(", ")}
                  </p>
                )}
              </section>
            )}
          </div>
        </>
      )}

      {/* Certifications */}
      {cert?.length > 0 && (
        <>
          <hr className="border-black my-2" />
          <section>
            <h3 className="uppercase text-vintageLavender font-semibold">
              Certifications
            </h3>

            <ul className="list-disc ml-5">
              {cert.map((x, i) => (
                <li key={i}>{x.certificationName}</li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}