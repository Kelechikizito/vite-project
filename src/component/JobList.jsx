import { useState, useEffect } from "react";

const JobList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) =>
        console.error(
          "There has been a problem with your fetch operation:",
          error
        )
      );
  }, []);

  if (!data || !Array.isArray(data)) {
    return <p>Loading...</p>; // display a loading message while data is being fetched
  }

  return (
    <ul className="py-16 px-4 sm:px-[10%] bg-[#effafa] min-h-screen flex flex-col gap-10">
      {data.map((job) => (
        <li
          key={job.id}
          style={job.id === 2 || job.id === 1 ? { borderLeft: '0.5rem solid #5ba4a4' } : {}}
          className="bg-[#fff] flex flex-col sm:flex-row justify-between py-4 px-4 sm:py-8 sm:px-12 gap-4 sm:gap-0 rounded-lg shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row relative gap-6">
            <div className="absolute sm:relative bottom-[100%] sm:bottom-0 size-[44px] sm:size-[88px]">
              <img src={job.logo} alt="company-logo" />
            </div>

            <div className="flex flex-col justify-between gap-2 sm:gap-0">
              <div className="flex gap-4">
                <p className="font-bold text-[#5ba4a4]">{job.company}</p>
                <div className="flex gap-2 text-xs">
                  {job.new ? (
                    <span className="flex justify-center items-center bg-[#5ba4a4] text-white px-2 rounded-xl">
                      NEW!
                    </span>
                  ) : null}
                  {job.featured ? (
                    <span className="flex justify-center items-center px-2 bg-black text-white rounded-xl">
                      FEATURED
                    </span>
                  ) : null}
                </div>
              </div>

              <h2 className="text-lg font-bold hover:text-[#5ba4a4] hover:cursor-pointer">{job.position}</h2>

              <div className="flex gap-2 text-[#808080]">
                <p>{job.postedAt}</p>
                <p>·</p>
                <p>{job.contract}</p>
                <p>·</p>
                <p>{job.location}</p>
              </div>
            </div>
          </div>

          <hr className="inline-block sm:hidden border-[1px]" />

          <div className="flex flex-wrap items-center justify-start sm:justify-end gap-4 text-[#5ba4a4]">
            <p className="text-sm font-bold px-2 py-0.5 rounded hover:cursor-pointer hover:text-white hover:bg-[#5ba4a4] bg-[#effafa]">{job.role}</p>
            <p className="text-sm font-bold px-2 py-0.5 rounded hover:cursor-pointer hover:text-white hover:bg-[#5ba4a4] bg-[#effafa]">{job.level}</p>
            {job.languages.map((language) => (
              <p className="text-sm font-bold px-2 py-0.5 rounded hover:cursor-pointer hover:text-white hover:bg-[#5ba4a4] bg-[#effafa]" key="">
                {language}
              </p>
            ))}
            {job.tools.map((tool) => (
              <p className="text-sm font-bold px-2 py-0.5 rounded hover:cursor-pointer hover:text-white hover:bg-[#5ba4a4] bg-[#effafa]" key="">
                {tool}
              </p>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default JobList;
