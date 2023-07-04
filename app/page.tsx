import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <div className="px-20 z-0 w-full min-h-screen min-w-screen items-center flex-col justify-center align-center font-mono text-sm lg:flex">
        <h1 className="font-mono font-bold text-7xl mt-10 mb-5">Next Entries</h1>
        <h4 className="font-mono text-xl mt-5 mb-5">Journal about your day, and predict whether you will have a good day tomorrow or need to prepare for crippling depression</h4>
      </div>
    </div>
  )
}
