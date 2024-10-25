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

  return (
    <ul className="py-16 px-4 sm:px-[10%] bg-[#effafa] min-h-screen flex flex-col gap-10">
      {data.map((job) => (
        <li
          key={job.id}
          className="bg-[#fff] flex flex-col sm:flex-row justify-between py-4 px-4 sm:py-8 sm:px-12 "
        >
          <div className="flex flex-col sm:flex-row relative gap-6">
            <div className="absolute sm:relative bottom-[100%] sm:bottom-0 size-[44px] sm:size-[88px]">
              <img src={job.logo} alt="company-logo" />
            </div>

            <div className="flex flex-col">
              <h2 className="text-lg font-bold">{job.position}</h2>
              <p className="text-sm text-gray-600">{job.company}</p>
            </div>
          </div>

          <hr className="inline-block sm:hidden" />

          <div>
            <p className="text-sm text-gray-500">{job.location}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default JobList;
