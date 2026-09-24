"use client";

export default function ExecutiveResume({ data }) {
  if (!data) return null;

  const { personalInfo, experience, education, projects, skill, cert } = data;
  const fullName = `${personalInfo?.fname || ""} ${personalInfo?.lname || ""}`;

  const convertDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-white text-black p-8 text-xs min-h-full">
      
      {/* Header */}
      <header className="border-b-4 border-black pb-4">
        <h1 className="text-3xl font-bold tracking-wide uppercase">
          {fullName}
        </h1>

        {personalInfo?.title && (
          <p className="text-sm uppercase tracking-[0.2em] text-vintageLavender font-semibold mt-1">
            {personalInfo.title}
          </p>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px]">
          {personalInfo?.email && <p>{personalInfo.email}</p>}
          {personalInfo?.phone && <p>{personalInfo.phone}</p>}
          {personalInfo?.state && <p>{personalInfo.state}</p>}
          {personalInfo?.linkedin && <p>{personalInfo.linkedin}</p>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mt-5">
          <h2 className="uppercase font-bold tracking-wider text-vintageLavender">
            Executive Profile
          </h2>
          <p className="mt-2 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mt-5">
          <h2 className="uppercase font-bold tracking-wider text-vintageLavender border-b border-gray-300 pb-1">
            Professional Experience
          </h2>

          {experience.map((x, i) => (
            <div key={i} className="mt-4">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="font-bold text-sm first-letter:uppercase">{x.title}</p>
                  {x.company && <p className="italic first-letter:uppercase">{x.company}</p>}
                </div>

                <p className="text-[11px] whitespace-nowrap">
                  {convertDate(x.startDate)} - {x.current ? "Present" : convertDate(x.endDate)}
                </p>
              </div>

              {x.description && (
                <ul className="list-disc ml-5 mt-1">
                  <li>{x.description}</li>
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section className="mt-5">
          <h2 className="uppercase font-bold tracking-wider text-vintageLavender border-b border-gray-300 pb-1">
            Selected Projects
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
                  <span className="font-semibold">Core Technologies: </span>
                  {x.technologies.join(", ")}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-6 mt-5">
        
        {education?.length > 0 && (
          <section>
            <h2 className="uppercase font-bold tracking-wider text-vintageLavender border-b border-gray-300 pb-1">
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

        {skill && (
          <section>
            <h2 className="uppercase font-bold tracking-wider text-vintageLavender border-b border-gray-300 pb-1">
              Core Skills
            </h2>

            {skill.technicalSkills?.length > 0 && (
              <p className="mt-2">
                <span className="font-semibold">Technical: </span>
                {skill.technicalSkills.join(", ")}
              </p>
            )}

            {skill.softSkills?.length > 0 && (
              <p className="mt-1">
                <span className="font-semibold">Soft: </span>
                {skill.softSkills.join(", ")}
              </p>
            )}

            {skill.strengths?.length > 0 && (
              <p className="mt-1">
                <span className="font-semibold">Strengths: </span>
                {skill.strengths.join(", ")}
              </p>
            )}
          </section>
        )}
      </div>

      {cert?.length > 0 && (
        <section className="mt-5">
          <h2 className="uppercase font-bold tracking-wider text-vintageLavender border-b border-gray-300 pb-1">
            Certifications
          </h2>

          <p className="mt-2">
            {cert.map((x) => x.certificationName).join(" • ")}
          </p>
        </section>
      )}
    </div>
  );
}