import { getCompanyHeadCount } from "@/app/services/db";
import { NextApiRequest, NextApiResponse } from "next";

// pages/api/test.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const response = await getCompanyHeadCount();
    
    res.status(200).json({ message: "API is working!" });
  }
  