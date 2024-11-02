import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { restaurantId, feedbackData } = req.body;
    //Store in feedback.json in the root directory
    const feedbackFilePath = path.join(process.cwd(), 'feedback.json');
    let feedbacks = [];

    if (fs.existsSync(feedbackFilePath)) {
      const fileData = fs.readFileSync(feedbackFilePath, 'utf8');
      feedbacks = JSON.parse(fileData);
    }

    feedbacks.push({ restaurantId, feedbackData, timestamp: new Date().toISOString() });

    fs.writeFileSync(feedbackFilePath, JSON.stringify(feedbacks, null, 2));

    res.status(200).json({ message: 'Feedback stored successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 