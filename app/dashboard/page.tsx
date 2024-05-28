export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex">
        <svg className="alo-logo-mobile mx-auto" xmlns="http://www.w3.org/2000/svg" width="53" height="36">
          <path d="M16.975 14.858h4.291v20.413h-4.291v-1.434A10.386 10.386 0 0 1 10.633 36C4.77 36 0 31.095 0 25.065S4.77 14.13 10.634 14.13c2.374 0 4.57.805 6.34 2.163zm0 10.212c0-3.598-2.845-6.526-6.342-6.526-3.497 0-6.341 2.928-6.341 6.526 0 3.6 2.844 6.527 6.342 6.527 3.496 0 6.34-2.928 6.34-6.527zM28.81 35.272h-4.29V0h4.291zm2.423-10.207c0-6.03 4.77-10.935 10.632-10.935 5.864 0 10.634 4.905 10.634 10.935S47.73 36 41.867 36c-5.864 0-10.633-4.905-10.633-10.935zm4.291.005c0 3.599 2.845 6.526 6.341 6.526 3.498 0 6.342-2.927 6.342-6.526 0-3.599-2.844-6.526-6.342-6.526-3.496 0-6.34 2.927-6.34 6.526z"></path>
            <desc>Alo</desc>
        </svg>
        Logged into Alo-yoga
      </div>
    </main>
  );
}
