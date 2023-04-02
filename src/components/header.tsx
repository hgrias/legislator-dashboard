import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="navbar bg-slate-500 text-primary-content">
      <div className="flex-1 pl-5 text-3xl font-bold">
        <Link href="/">Legislator Profile Dashboard</Link>
      </div>
      <div className="dropdown-end dropdown">
        {sessionData?.user ? (
          <label
            tabIndex={0}
            className="btn-ghost btn-circle avatar btn"
            onClick={() => void signOut()}
          >
            <div className="w-10 rounded-full">
              <img
                src={sessionData?.user?.image ?? ""}
                alt={sessionData?.user?.name ?? ""}
              />
            </div>
          </label>
        ) : (
          <button
            className="btn-ghost rounded-btn btn"
            onClick={() => void signIn()}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};
