import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
export const getCompanies = async () => {
  const { data: companies, error } = await supabase
    .from('companies')
    .select('*')
  
  const countMap = await getCompanyHeadCount();
  const jobPostings = await getJobPostings();
  const companiesWithCount = companies?.map(company => {
    const companyJobPostings = jobPostings?.filter(posting => posting.company_id === company.company_id);

    return {
      ...company,
      head_count: countMap[company.company_id] || 0,
      job_postings: companyJobPostings.length > 0 ? companyJobPostings[0].job_posting_count : 0
    }

  })
  
  if (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data from Companies table');
  }
  return companiesWithCount;
}

export const getCompanyDetails = async (company_id: string) => {
  const { data: company, error } = await supabase
  .from('companies')
  .select('*')
  .eq('company_id', company_id)
  .single()

  if (error) {
    console.error('Error getting company info:', error);
    throw new Error('Failed to get entry from companies table');
  }
  return company;
}

export const getPersonsForCompany = async (company_id: string) => {
  const { data: persons, error } = await supabase
  .from('persons')
  .select('*')
  .eq('company_id', company_id);

  if (error) {
    console.error('Error fetching persons:', error);
    return [];
  }
  return persons; 
}

export const getJobPostingsForCompany = async (company_id: string) => {
  const {data: jobPostings, error } = await supabase
  .from('job_postings')
  .select('*')
  .eq('company_id', company_id)

  if (error) { 
    console.error('Error fetching job postings:', error);
    return [];
  }
  const cleanJobPostings = removeNullValues(jobPostings);

  return deconstructJobPostings(cleanJobPostings);
}

// Remove null values
const removeNullValues = (array) => {
  return array.map(item => {
      return Object.fromEntries(
          Object.entries(item).filter(([key, value]) => value !== null)
      );
  });
};

// Parse job posting column names to JobPosting interface
const deconstructJobPostings = (array) => {
  return array.flatMap(item => {
      const postings = [];
      for (let i = 1; i <= 3; i++) { 
          const jobType = item[`job_posting_${i}_job_type`];
          const matchingContext = item[`job_posting_${i}_matching_context`];
          const title = item[`job_posting_${i}_title`];
          const url = item[`job_posting_${i}_url`];

          if (jobType && title) {
              postings.push({
                  job_type: jobType,
                  matching_context: matchingContext,
                  title: title,
                  url: url
              });
          }
      }
      return postings; // Return all postings for this item
  });
};
export const getCompanyHeadCount = async () => {
    const {data: companies, error} = await supabase
        .from('companies')
        .select('company_id')
    
    if (error) {
      console.error('Error getting company info:', error);
      throw new Error('Failed to get entry from persons table');
    }

    const companyIds = companies?.map(company => company.company_id)
    const { data: counts, error: countError } = await supabase
        .from('persons')
        .select('company_id', { count: 'exact' }) 
        .in('company_id', companyIds);
    
    if (countError) {
      console.error('Error getting company info:', countError);
      throw new Error('Failed to get entry from persons table');
    }

    // initializes countMap companyIds to 0
    const countMap = companyIds?.reduce((acc, id) => {
        acc[id] = 0; 
        return acc;
    }, {});

    // console.log(`countMap: ${JSON.stringify(countMap)}`)
    // console.log(`counts: ${JSON.stringify(counts)}`)

    // counts: returns each row in Person with match on companyIds as companyIds[]
    counts.forEach(person => {
        countMap[person.company_id] = (countMap[person.company_id] || 0) + 1;
    });

    return countMap;

}

export const sortByCompanySize = async () => {
    const {data: companies, error} = await supabase   
        .from('companies')
        .select('*')

    if (error) throw error;

    const sortedCompanies = companies.sort((a, b) => {
        const order = {
            '0-10 employees': 1,
            '11-50 employees': 2,
            '51-200 employees': 3,
            '201-500 employees': 4,
            '501-1,000 employees': 5,
            '1,001-5,000 employees': 6,
            '5,001-10,000 employees': 7,
            '10,001+ employees': 8,
            'other': 9
        };
        return (order[a.size] || 9) - (order[b.size] || 9);
    });

    return sortedCompanies;
}

export const getJobPostings = async () => {
  const { data: jobPostings, error: jobPostingError } = await supabase
    .from('job_postings')
    .select('company_id, job_posting_1_job_type, job_posting_2_job_type, job_posting_3_job_type');

    const totalJobPostingCounts = {};

    jobPostings?.forEach(posting => {
        const { company_id, job_posting_1_job_type, job_posting_2_job_type, job_posting_3_job_type, job_posting_count } = posting;

        // Initialize the total count for this company if not already done
        if (!totalJobPostingCounts[company_id]) {
            totalJobPostingCounts[company_id] = 0; 
        }

        // Increment the total count based on non-null job posting types
        if (job_posting_1_job_type !== null) totalJobPostingCounts[company_id]++;
        if (job_posting_2_job_type !== null) totalJobPostingCounts[company_id]++;
        if (job_posting_3_job_type !== null) totalJobPostingCounts[company_id]++;
        posting.job_posting_count = totalJobPostingCounts[company_id]
    });
      // Format the result as an array of objects
      const formattedResponse = Object.keys(totalJobPostingCounts).map(company_id => ({
        company_id,
        job_posting_count: totalJobPostingCounts[company_id],
    }));
    return formattedResponse;
}

export { createClient };
