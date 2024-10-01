'use client'
import React, { useEffect, useState } from 'react';
import { Company, COMPANY_SIZE } from '../types';
import Sidebar from './CompanyDetails';
import ArrowRight from './ArrowRight';
import ArrowDown from './ArrowDown';
import ArrowUp from './ArrowUp';
import JobPostingPopUp from './JobPostingDetails';

const CompanyTable = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [error, setError] = useState('');
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [sortDirection, setSortDirection] = useState<'asc' |'desc'>('asc');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isJobPostingPopupOpen, setIsJobPostingPopupOpen] = useState(false);

    const closeSidebar = () => {
        setIsSidebarOpen(false);
        setIsJobPostingPopupOpen(false);
    };

    const handleRowClick = (company: string) => {
      setSelectedCompany(company);
      setIsSidebarOpen(true)
    };

    const handleJobPostingClick = (company: string ) => {
        setSelectedCompany(company)
        setIsJobPostingPopupOpen(true)
    }

    const toggleSortDirection = () => {
        const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newDirection);
        sortCompaniesBySize(newDirection);
    };

    const toggleSortDirectionAlpha = () => {
        const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newDirection);
        sortCompaniesByAlpha(newDirection);
    };

    const sortCompaniesBySize = async (direction: 'asc' | 'desc') => {
        const order = {
            [COMPANY_SIZE.EARLY]: 1,
            [COMPANY_SIZE.SMALL]: 2,
            [COMPANY_SIZE.SMALL_MID]: 3,
            [COMPANY_SIZE.MID]: 4,
            [COMPANY_SIZE.MID_LARGE]: 5,
            [COMPANY_SIZE.LARGE]: 6,
            [COMPANY_SIZE.LARGER]: 7,
            [COMPANY_SIZE.MEGA]: 8
        };

        const sorted = [...companies].sort((a, b) => {
            const aOrder = order[a.size] || 9;
            const bOrder = order[b.size] || 9;

            return direction === 'asc' ? aOrder - bOrder : bOrder - aOrder;
        });

        setCompanies(sorted);
    }

    const sortCompaniesByAlpha = async (direction: 'asc' | 'desc') => {
        const sorted = [...companies].sort((a, b) => {
            const comparison = a.company_name.localeCompare(b.company_name);
            return direction === 'asc' ? comparison : -comparison;
        });

        setCompanies(sorted);
    }

    useEffect(() => {
        
        const fetchCompanies = async () => {
            try {
                const res = await fetch('/api/companies'); // Relative URL since it's on the same domain
                if (!res.ok) {
                throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setCompanies(data);
            } catch (err) {
                setError(err.message);
            } 
        };

        fetchCompanies();
    }, []);


    const mapEmployeesToSize = (value: string) => {
        switch (value) {
            case COMPANY_SIZE.EARLY:
                return 'EARLY';
            case COMPANY_SIZE.SMALL:
                return 'SMALL';
            case COMPANY_SIZE.SMALL_MID:
                return 'SMALL-MID';
            case COMPANY_SIZE.MID:
                return 'MID';
            case COMPANY_SIZE.MID_LARGE:
                return 'MID-LARGE';
            case COMPANY_SIZE.LARGE:
                return 'LARGE';
            case COMPANY_SIZE.LARGER:
                return 'LARGER';
            case COMPANY_SIZE.MEGA:
                return 'MEGA';
            default:
                return undefined; // return undefined if not found
        }
    }
    
  return (
    <div>
      <h2>Companies</h2>
      <table className="w-full border-collapse p-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 flex items-center">Company
                <span className="ml-1" onClick={toggleSortDirectionAlpha}>
                    {sortDirection === 'asc' ? (
                        <ArrowUp />
                    ) : (
                        <ArrowDown />
                    )}
                </span>

            </th>
            <th className="border border-gray-300 p-2">Industry</th>
            <th className="border border-gray-300 p-2">Job Postings</th>
            <th className="border border-gray-300 p-2 flex items-center">Size 
                <span className="ml-1" onClick={toggleSortDirection}>
                {sortDirection === 'asc' ? (
                    <ArrowUp />
                ) : (
                    <ArrowDown />
                )}
                </span>
            </th>
        </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 hover:bg-yellow-100 cursor-pointer" onClick={() => handleRowClick(company)}>
                <a
                    href={'https:' + company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    {company.company_name}
                    <ArrowRight />
                </a>
                <div className="text-gray-600 mt-1">{company.head_count || 0} job change(s) </div>
              </td>
              <td className="border border-gray-300 p-2">{company.industry}</td>
              <td className={`border border-gray-300 p-2 ${company.job_postings === 0 ? 'bg-gray-100' : ' hover:bg-yellow-100 cursor-pointer'}`} onClick={() => handleJobPostingClick(company)}>        
                {company.job_postings === 0 ? (
                <div className="h-8 w-full flex items-center justify-center"></div>
        ) : (
            `${company.job_postings} post(s)`
        )}</td>
              <td className="border border-gray-300 p-2">{company.size}</td>
            </tr>
          ))}
        </tbody>

      </table>
      {isSidebarOpen && <Sidebar company={selectedCompany} onClose={closeSidebar} />}
      {isJobPostingPopupOpen && <JobPostingPopUp company={selectedCompany} onClose={closeSidebar} />}
    </div>
  );
};

export default CompanyTable;
