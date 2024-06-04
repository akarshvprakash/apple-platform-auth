import { AttestationConveyancePreference, AuthenticatorAttachment, PublicKeyCredentialParameters, AuthenticatorAttestationResponse } from '@simplewebauthn/typescript-types';

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");

const saveCredential = async (credential: {
  id: string;
  rawId: string;
  response: {
      clientDataJSON: string;
      attestationObject: string;
  };
  type: string;
}, user: {    
    email: string
    id: number,
    name: string
}) => {
    try {
      // Serialize the credential data (e.g., as JSON)
      const serializedCredential = JSON.stringify(credential);

      // Send the serialized credential data to the backend
      const response = await fetch('/api/users/register-apple-ath', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify({
            user_id: user.id,
            credential_data: serializedCredential
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save credential');
      }

      // Optionally, handle the response from the backend
    } catch (error) {
      console.error('Error saving credential:', error);
    }
  };

// Assume this code is within an async function
export async function createCredential(user: {    
    email: string
    id: number,
    name: string
}) {
    let publicKeyCredential: PublicKeyCredential | null = null;
    const userIdBuffer = encoder.encode(user.id.toString());
    const challengeBuffer = encoder.encode("34914012789326781858713765455437");
    const options = {
        publicKey: {
            rp: { name: "apple-platform-auth.vercel.app" },
            user: {
                name: user.email,
                id: userIdBuffer,
                displayName: user.name
            },
            pubKeyCredParams: [{ type: "public-key", alg: -7 } as PublicKeyCredentialParameters],
            challenge: challengeBuffer,
            authenticatorSelection: { authenticatorAttachment: 'platform' as AuthenticatorAttachment },
            attestation: "direct" as AttestationConveyancePreference // Ensure proper typing
        }
    };
    try {
        // Ensure this call is within an async function
        publicKeyCredential = await navigator.credentials.create(options) as PublicKeyCredential;
        // Handle the created credential as needed
    } catch (error) {
        console.error('Error creating credential:', error);
        // Handle errors appropriately
    }

    if(publicKeyCredential) {
        const attestationResponse = publicKeyCredential.response as AuthenticatorAttestationResponse;
        console.log("publicKeyCredential", publicKeyCredential);
        console.log("id", publicKeyCredential?.id);
        console.log("rawId", decoder.decode(publicKeyCredential.rawId));
        console.log("attestationObject", decoder.decode(attestationResponse.attestationObject));
        console.log("clientDataJSON", decoder.decode(attestationResponse.clientDataJSON));

        // Prepare data to send to the server
        const credentialData = {
          id: publicKeyCredential.id,
          rawId: arrayBufferToBase64(publicKeyCredential.rawId),
          response: {
            clientDataJSON: arrayBufferToBase64(publicKeyCredential.response.clientDataJSON),
            attestationObject: arrayBufferToBase64((publicKeyCredential.response as AuthenticatorAttestationResponse).attestationObject),
          },
          type: publicKeyCredential.type,
        };
        saveCredential(credentialData, user)
    }
  }

  function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }