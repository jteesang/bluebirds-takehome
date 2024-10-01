import type { NextApiRequest, NextApiResponse } from 'next';
import { getPersonsForCompany } from '@/app/services/db'; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const id= req.query.id;
    if (typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

  if (req.method === 'GET') {
    try {
        const persons = await getPersonsForCompany(String(id));
        if (persons.length === 0) {
            return res.status(404).json({ message: 'No persons found for this company.' });
        }
        res.status(200).json(persons);
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
