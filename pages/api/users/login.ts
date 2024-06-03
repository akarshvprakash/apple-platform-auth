import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const client = await pool.connect();
      const userResult = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = userResult.rows[0];
      client.release();

      if (user && (password === user.password)) {
        // Assuming we will use session or JWT for managing user sessions
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
