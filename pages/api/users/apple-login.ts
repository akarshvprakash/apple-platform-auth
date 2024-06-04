import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, signature } = req.body;

    if (!id || !signature) {
      return res.status(400).send('Invalid request');
    }

    try {

      //const verificationResult : any = {} //: VerifiedRegistrationResponse = {};//await verifyRegistrationResponse(verificationOptions);
      //if (verificationResult?.verified && verificationResult?.registrationInfo) {
      if (id && signature) {
        // const { credentialID, credentialPublicKey } = verificationResult.registrationInfo;
        // const client = await pool.connect();
        // const query = 'INSERT INTO publickkey (user_id, credential_id, public_key, raw_id) VALUES ($1, $2, $3, $4) RETURNING *';
        // const values = [user_id, id, response.attestationObject, rawId];
        // await client.query(
        //     query,
        //     values
        // );
        console.log(signature, id);
        // client.release();
        res.status(201).json({ message: 'User biometric_credentials saved successfully' });
      }
      res.status(400).json({ message: 'User biometric_credentials not saved' });
    } catch (error) {
        console.error('Error saving credential:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}