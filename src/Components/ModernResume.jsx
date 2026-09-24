"use client";
import { FaPhone, FaLocationDot, FaLinkedin } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

export default function ModernResume({ data }) {
  if (!data) return null;

  const { personalInfo, experience, education, projects, skill, cert } = data;
  const fullName = `${personalInfo?.fname || ""} ${personalInfo?.lname || ""}`;

  const convertDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-white text-black grid grid-cols-[32%_68%] min-h-full text-xs">
      
      {/* Sidebar */}
      <aside className="bg-slate-900 text-white p-5">
        <h1 className="text-md md:text-lg font-bold leading-tight">{fullName}</h1>
        <p className="uppercase text-vintageLavender font-semibold mt-1">
          {personalInfo?.title}
        </p>

        <div className="mt-6 space-y-2 text-[11px]">
          {personalInfo?.email && <p className="flex gap-2"><MdOutlineEmail /> {personalInfo.email}</p>}
          {personalInfo?.phone && <p className="flex gap-2"><FaPhone /> {personalInfo.phone}</p>}
          {personalInfo?.state && <p className="flex gap-2"><FaLocationDot /> {personalInfo.state}</p>}
          {personalInfo?.linkedin && <p className="flex gap-2"><FaLinkedin /> {personalInfo.linkedin}</p>}
        </div>

        {skill && (
          <section className="mt-6">
            <h2 className="uppercase text-vintageLavender font-bold border-b border-white/30 pb-1">
              Skills
            </h2>

            {skill.technicalSkills?.length > 0 && (
              <div className="mt-3">
                <p className="font-semibold">Technical</p>
                <p className="text-[11px]">{skill.technicalSkills.join(", ")}</p>
              </div>
            )}

            {skill.softSkills?.length > 0 && (
              <div className="mt-3">
                <p className="font-semibold">Soft Skills</p>
                <p className="text-[11px]">{skill.softSkills.join(", ")}</p>
              </div>
            )}

            {skill.strengths?.length > 0 && (
              <div className="mt-3">
                <p className="font-semibold">Strengths</p>
                <p className="text-[11px]">{skill.strengths.join(", ")}</p>
              </div>
            )}
          </section>
        )}

        {cert?.length > 0 && (
          <section className="mt-6">
            <h2 className="uppercase text-vintageLavender font-bold border-b border-white/30 pb-1">
              Certifications
            </h2>
            <ul className="list-disc ml-4 mt-2 space-y-1">
              {cert.map((x, i) => (
                <li key={i}>{x.certificationName}</li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="p-6">
        {personalInfo?.summary && (
          <section>
            <h2 className="uppercase text-slate-900 font-bold border-b border-slate-300 pb-1">
              Professional Summary
            </h2>
            <p className="mt-2">{personalInfo.summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section className="mt-5">
            <h2 className="uppercase text-slate-900 font-bold border-b border-slate-300 pb-1">
              Experience
            </h2>

            {experience.map((x, i) => (
              <div key={i} className="mt-3">
                <div className="flex justify-between gap-3">
                  <p className="font-bold">{x.title}</p>
                  <p className="text-[11px] whitespace-nowrap">
                    {convertDate(x.startDate)} - {x.current ? "Present" : convertDate(x.endDate)}
                  </p>
                </div>
                {x.company && <p className="italic">{x.company}</p>}
                {x.description && (
                  <ul className="list-disc ml-5 mt-1">
                    <li>{x.description}</li>
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {projects?.length > 0 && (
          <section className="mt-5">
            <h2 className="uppercase text-slate-900 font-bold border-b border-slate-300 pb-1">
              Projects
            </h2>

            {projects.map((x, i) => (
              <div key={i} className="mt-3">
                <p className="font-bold">{x.projectName}</p>
                {x.description && (
                  <ul className="list-disc ml-5 mt-1">
                    <li>{x.description}</li>
                  </ul>
                )}
                {x.technologies?.length > 0 && (
                  <p className="text-[11px] mt-1">
                    <span className="font-semibold">Technologies: </span>
                    {x.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {education?.length > 0 && (
          <section className="mt-5">
            <h2 className="uppercase text-slate-900 font-bold border-b border-slate-300 pb-1">
              Education
            </h2>

            {education.map((x, i) => (
              <div key={i} className="mt-2">
                <p className="font-bold">{x.schoolName}</p>
                {x.degree && <p>{x.degree}</p>}
                <p className="text-[11px]">
                  {convertDate(x.startDate)} - {x.current ? "Present" : convertDate(x.endDate)}
                </p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}