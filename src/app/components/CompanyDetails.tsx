// Sidebar.js
import React, { useState } from 'react';
import { Person } from '../types';
import Person from './PersonDetails';
import PersonDetails from './PersonDetails';
import ArrowRight from './ArrowRight';

const Sidebar = ({ company, onClose }) => {
  if (!company) return null;
  const [error, setError] = useState('')
  const [persons, setPersons] = useState<Person>();
  const [showPersons, setShowPersons] = useState(false);

  
  const handleViewPersons = async () => {
    try {
      const res = await fetch(`/api/companies/${company.company_id}/persons`); // Relative URL since it's on the same domain
      if (!res.ok) {
      throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setPersons(data);
      setShowPersons(true);
    } catch (err) {
        setError(err.message);
    } 
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-end">
      <div className="bg-white w-1/3 p-5">
        <h2 className="text-xl font-bold mb-2">{company.company_name}
            <a 
                href={'https:'+company.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 underline ml-1"
            >
            <ArrowRight/>
            </a>
 
        </h2>
        <p><strong>LinkedIn:</strong> 
            <a 
                href={company.company_linkedin_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 underline ml-1">
            View Company Profile
            </a>
        </p>
        <p><strong>Industry:</strong> {company.industry}</p>
        <p><strong>Employees:</strong> {company.num_employees_on_linkedin}</p>
        <button onClick={handleViewPersons} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">See People</button>
        {showPersons && <PersonDetails persons={persons} />}

        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default Sidebar;
