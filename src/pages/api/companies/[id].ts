import type { NextApiRequest, NextApiResponse } from 'next';
import { getCompanyDetails } from '@/app/services/db'; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id;

  if (req.method === 'GET') {
    try {
      const companies = await getCompanyDetails(String(id));

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
