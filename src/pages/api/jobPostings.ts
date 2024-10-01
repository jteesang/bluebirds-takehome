import type { NextApiRequest, NextApiResponse } from 'next';
import {  getJobPostings } from '@/app/services/db'; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const postings = await getJobPostings();
      console.log(`postings: ${JSON.stringify(postings)}`)
      res.status(200).json(postings);
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
