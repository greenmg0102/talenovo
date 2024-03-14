import React from "react";

const JobCard = ({
  companyUrl,
  companyName,
  companyDescription,
  jobTitleUrl,
  jobTitle,
  remote,
  postedTime,
  skills,
}) => {
  return (
    <tr className="m-1 overflow-hidden rounded bg-white shadow-lg hover:bg-green-50 group my-3 sm:h-28">
      <td className="hidden w-2/5 whitespace-nowrap px-4 pl-6 sm:table-cell">
        <div className="flex items-center">
          <div className="ml-6 w-80">
            <div className="truncate text-base text-gray-500">
              <a
                href={companyUrl}
                className=""
                data-kind="company-profile-name"
                target="_self"
              >
                {companyName}
              </a>
              <span className="text-sm"> {companyDescription} </span>
            </div>
            <h2 className="truncate text-xl font-medium text-gray-900">
              <a
                href={jobTitleUrl}
                className=""
                data-kind="title-name"
                target="_blank"
              >
                {jobTitle}
              </a>
            </h2>
            <div className="flex flex-wrap">
              <div className="mr-1 flex flex-wrap text-sm text-gray-500">
                <span className="mb-1 inline-flex h-fit whitespace-nowrap bg-green-100 px-2 py-0.5 text-xs font-medium leading-5  text-green-800">
                  {remote}
                </span>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="hidden w-2/5 px-2 sm:table-cell">
        <div className="flex flex-wrap">
          {skills.map((skill) => (
            <span
              key={skill}
              className="my-0.5 inline-flex border border-gray-100 bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </td>
      <td className="relative hidden w-1/5 w-20 whitespace-nowrap px-2 text-gray-500 sm:table-cell">
        {postedTime}
        <span className="right-0 top-0 hidden rounded-bl-lg bg-teal-500 px-2 text-sm text-white sm:absolute sm:block"></span>
      </td>
    </tr>
  );
};

export default JobCard;
