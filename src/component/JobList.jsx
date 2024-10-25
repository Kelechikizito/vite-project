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
    <ul className="py-16 px-4 sm:px-[10%] bg-[#effafa] min-h-screen flex flex-col gap-8">
      {data.map((job) => (
        <li key={job.id} className="bg-[#fff] flex flex-col sm:flex-row justify-between py-8 px-12">
          <div>
            <h2 className="text-lg font-bold">{job.position}</h2>
            <p className="text-sm text-gray-600">{job.company}</p>
          </div>

          <hr className="inline-block sm:hidden"/>

          <div>
            <p className="text-sm text-gray-500">{job.location}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default JobList;
