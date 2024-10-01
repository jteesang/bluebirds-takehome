
const JobPostingListing = ({posting}) => {

    return (
        <div className="job-postings">
            <ul className="list-disc pl-5">
                <li className="mb-3 border p-3 rounded shadow">
                    <h3 className="text-lg font-semibold">{posting.title}</h3>
                    <p className="text-gray-700"><strong>Job Type:</strong> {posting.job_type}</p>
                    <p className="text-gray-600"><strong>Context:</strong> {JSON.stringify(posting.matching_context)}</p>
                    <a 
                        href={posting.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-500 hover:underline"
                    >
                        View Job Posting
                    </a>
                </li>
            
            </ul>
    </div>
    )
}

export default JobPostingListing;