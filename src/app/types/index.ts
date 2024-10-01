export interface Person {
    first_name: string,
    last_name: string,
    title: string,
    persona_type: string,
    persona_match_score: number,
    persona_linkedin_url: string,
    in_job_since: string,
    timezone?: string,
    member_state?: string,
    member_country: string
};

export interface Company {
    company_id: string,
    company_name: string,
    head_count: number, // calculated
    job_postings: number, // calculated
    addressable_company_Name: string,
    website: string,
    company_linkedin_url: string,
    company_linkedin_id: string,
    num_employees_on_linkedin: number,
    size: string,
    industry: string,
    city?: string,
    state?: string,
    country: string,
};

export interface JobPosting {
    job_type: string,
    matching_context: JSON,
    title: string,
    url: string
}

export enum COMPANY_SIZE {
    EARLY = '0-10 employees',
    SMALL = '11-50 employees',
    SMALL_MID = '51-200 employees',
    MID = '201-500 employees',
    MID_LARGE = '501-1,000 employees',
    LARGE = '1,001-5,000 employees',
    LARGER = '5,001-10,000 employees', // gave up on naming
    MEGA = '10,001+ employees'
}