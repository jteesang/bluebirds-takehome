

const PersonDetails = ( {persons}) => {

    return (
        <div>
            <ul>
            {persons.map((person, index) => (
                <li key={index}>
                    <strong>{person.first_name} {person.last_name}</strong> - {person.title}
                    <br />
                    LinkedIn: <a 
                        href={'https:' + person.persona_linkedin_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 underline ml-1"
                    >View Profile</a>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default PersonDetails;