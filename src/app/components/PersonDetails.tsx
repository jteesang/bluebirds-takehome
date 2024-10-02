import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react";
import { Person } from "../types";

interface PersonDetails {
    persons: Person;
  }

const PersonDetails: React.FC<PersonDetails> = ( {persons}) => {
    return (
        <div>
            <ul>
            {persons.map((person: { first_name: string | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; last_name: string | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; title: string | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; persona_linkedin_url: string; }, index: Key | null | undefined) => (
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