import type { NextApiRequest, NextApiResponse } from 'next';
import { getCompanies, getCompanyHeadCount, getJobPostings, sortByCompanySize } from '@/app/services/db'; 
import { useRouter } from 'next/router';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {


  
  if (req.method === 'GET') {
    
    try {
 
      const companies = await getCompanies();

      res.status(200).json(companies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
