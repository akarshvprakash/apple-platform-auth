// pages/index.tsx
'use client';
import { useState } from 'react';
import Modal from './components/Modal';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { AttestationConveyancePreference, AuthenticatorAttachment, PublicKeyCredentialParameters, AuthenticatorAttestationResponse } from '@simplewebauthn/typescript-types';
const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [publicKeyCredential, setPublicKeyCredential] = useState<PublicKeyCredential | null>(null);
  // Assume this code is within an async function
  async function createCredential() {
    const userIdBuffer = encoder.encode("7146969202868");
    const challengeBuffer = encoder.encode("34914012789326781858713765455437");
    const options = {
        publicKey: {
            rp: { name: "aloyoga.com" },
            user: {
                name: "akarsh@example.com",
                id: userIdBuffer,
                displayName: "Akarsh V"
            },
            pubKeyCredParams: [{ type: "public-key", alg: -7 } as PublicKeyCredentialParameters],
            challenge: challengeBuffer,
            authenticatorSelection: { authenticatorAttachment: 'platform' as AuthenticatorAttachment },
            attestation: "direct" as AttestationConveyancePreference // Ensure proper typing
        }
    };
    try {
        // Ensure this call is within an async function
        const cred = await navigator.credentials.create(options) as PublicKeyCredential;
        setPublicKeyCredential(cred);
        // Handle the created credential as needed
    } catch (error) {
        console.error('Error creating credential:', error);
        // Handle errors appropriately
    }
  }
  if(publicKeyCredential) {
    const attestationResponse = publicKeyCredential.response as AuthenticatorAttestationResponse;
    console.log("publicKeyCredential", publicKeyCredential);
    console.log("id", publicKeyCredential?.id);
    console.log("rawId", decoder.decode(publicKeyCredential.rawId));
    console.log("attestationObject", decoder.decode(attestationResponse.attestationObject));
    console.log("clientDataJSON", decoder.decode(attestationResponse.clientDataJSON));
  }
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between login-page">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <button onClick={createCredential} style={{width: "100%"}} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login</button>
        <button onClick={() => setShowModalRegister(true)} style={{width: "100%"}} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Register</button>
        </div>
      </main>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <LoginForm onClose={() => setShowModal(false)} />
      </Modal>
      <Modal showModal={showModalRegister} setShowModal={setShowModalRegister}>
        <RegisterForm onClose={() => setShowModalRegister(false)} />
      </Modal>
    </>
  );
}
