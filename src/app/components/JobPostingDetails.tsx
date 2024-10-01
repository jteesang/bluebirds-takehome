import React, { useEffect, useState } from 'react';
import { JobPosting } from '../types';
import JobPostingListing from './JobPosting';

const JobPostingPopUp = ({ company, onClose }) => {
  if (!company) return null;
  const [error, setError] = useState('')
  const [jobPostings, setPostings] = useState<JobPosting[]>();

  useEffect(() => {
    const fetchPostings = async () => {
        try {
            const res = await fetch(`/api/companies/${company.company_id}/jobPostings`);
            if (!res.ok) {
            throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setPostings(data);
        } catch (err) {
            setError(err.message);
        } 
    };

    fetchPostings();
}, []);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-end">
      <div className="bg-white w-1/3 p-5">
        <h2 className="text-2xl font-bold mb-4">Job Postings</h2>
        {jobPostings?.map((posting, index) => (
            <JobPostingListing posting={posting}/>
        ))}

        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default JobPostingPopUp;
