'use client';
import { useState } from 'react';
import Modal from './components/Modal';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);

  const openLoginPopup = async () => {
    const credentialId =  localStorage.getItem("credentialId");
    if(credentialId) {
      // Sign in
      const challengeBuffer = encoder.encode("34914012789326781858713765455437");
      const credentialIdBuffer = encoder.encode(credentialId);
        const options = {
          publicKey: {
              challenge: challengeBuffer,
              allowCredentials: [{
                  type: "public-key",
                  id: credentialIdBuffer,
                  transports: ["internal"]
              }]
          }
        };
        const publicKeyCredential = await navigator.credentials.get(options as CredentialRequestOptions) as PublicKeyCredential;
        if(publicKeyCredential) {
          const attestationResponse = publicKeyCredential.response as AuthenticatorAssertionResponse
          const signature = decoder.decode(attestationResponse.signature);
          const id = publicKeyCredential.id;
          const res = await fetch('/api/users/apple-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ signature, id }),
          });
      
          if (res.ok) {
            setShowModal(false);
            window.location.href = "/dashboard";
          }
        }
        alert("something wrong");
        setShowModal(true);
    } else {
      alert("apple faceid not enabled");
      setShowModal(true);
    }
  }
  
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between login-page">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <button onClick={openLoginPopup}style={{width: "100%"}} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login</button>
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
