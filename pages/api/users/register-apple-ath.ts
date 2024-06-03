import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user_id, credential_data } = req.body;

    try {
        const client = await pool.connect();
        const query = 'INSERT INTO biometric_credentials (user_id, credential_data) VALUES ($1, $2) RETURNING *';
        const values = [user_id, credential_data];
        await client.query(
            query,
            values
        );
        client.release();
        res.status(201).json({ message: 'User biometric_credentials saved successfully' });
    } catch (error) {
        console.error('Error saving credential:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}