import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyRegistrationResponse, VerifiedRegistrationResponse, VerifyRegistrationResponseOpts } from '@simplewebauthn/server';
import pool from '../database';
import base64url from 'base64url';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user_id, credential_data } = req.body;
    const { id, rawId, response, type } = JSON.parse(credential_data);

    if (type !== 'public-key' || !id || !rawId || !response) {
      return res.status(400).send('Invalid request');
    }

    const verificationOptions: any = {
      credential: {
        id: id,
        rawId: base64url.toBuffer(rawId),
        response: {
          attestationObject: base64url.toBuffer(response.attestationObject),
          clientDataJSON: base64url.toBuffer(response.clientDataJSON),
        },
        type: type,
      },
      expectedChallenge: "34914012789326781858713765455437",
      expectedOrigin: 'https://apple-platform-auth.vercel.app', // Replace with your origin
      expectedRPID: 'apple-platform-auth.vercel.app', // Replace with your domain
    };

    console.log("verificationOptions", verificationOptions);

    try {

      const verificationResult : any = {} //: VerifiedRegistrationResponse = {};//await verifyRegistrationResponse(verificationOptions);
      console.log("verificationResult.registrationInfo", user_id);
      if (verificationResult?.verified && verificationResult?.registrationInfo) {
        console.log("verificationResult.registrationInfo", verificationResult?.registrationInfo);
        // const { credentialID, credentialPublicKey } = verificationResult.registrationInfo;
        const client = await pool.connect();
        // const query = 'INSERT INTO publickkey (user_id, credential_id, public_key) VALUES ($1, $2, $3) RETURNING *';
        // const values = [user_id, credentialID, credentialPublicKey];
        // await client.query(
        //     query,
        //     values
        // );
        client.release();
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