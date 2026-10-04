import Image from "next/image";

// Icons need to be installed: `npm install react-icons`
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { FiX } from 'react-icons/fi';

export default function Login() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#f7b900] text-white"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(247,185,0,0.18) 0%, rgba(247,185,0,0.06) 35%, rgba(22,22,22,0.18) 100%), url('/images/login-hero.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'left center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#f7b900]/20 via-transparent to-black/20" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:justify-end lg:px-16">
        <div className="w-full max-w-[560px] rounded-[28px] border border-white/8 bg-[#2f3136]/92 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-8 lg:mr-8 lg:p-10">
          <div className="mb-8 flex justify-center">
            <button
              type="button"
              aria-label="Close sign in modal"
              className="text-white/85 transition hover:text-white"
            >
              <FiX className="text-[34px] stroke-[1.75]" />
            </button>
          </div>

          <div className="mx-auto w-full max-w-[396px]">
            <h1 className="mb-8 text-center text-[2rem] font-medium tracking-[-0.03em] text-white sm:text-[2.25rem]">
              Sign in to QC
            </h1>

            <div className="space-y-4">
              <button className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-[1rem] font-semibold text-black transition duration-200 hover:bg-white/90">
                <FcGoogle className="text-[1.35rem]" />
                <span>Sign in with Google</span>
              </button>

              <button className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-[1rem] font-semibold text-black transition duration-200 hover:bg-white/90">
                <AiFillApple className="text-[1.45rem]" />
                <span>Sign in with Apple</span>
              </button>
            </div>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/12" />
              <span className="text-sm font-medium text-white/60">or</span>
              <div className="h-px flex-1 bg-white/12" />
            </div>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Phone, email, or username"
                className="w-full rounded-xl border border-white/7 bg-[#35373d] px-5 py-4 text-[1rem] text-white placeholder:text-white/28 focus:border-white/20 focus:outline-none"
              />

              <button className="w-full rounded-full bg-white px-5 py-3 text-[1rem] font-semibold text-black transition duration-200 hover:bg-white/90">
              <a href="/home">Next</a>
              </button>

              <button className="w-full rounded-full border border-white/10 px-5 py-3 text-[1rem] font-medium text-white transition duration-200 hover:bg-white/5">
                Forgot password?
              </button>
            </div>

            <p className="mt-12 text-center text-sm text-white/40 sm:text-[0.95rem]">
              Don&apos;t have an account?
              <a href="#" className="ml-1 font-medium text-[#4ea3ff] transition hover:text-[#78bbff]">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
