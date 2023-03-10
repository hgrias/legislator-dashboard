import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { Header } from "~/components/header";
import Bio from "~/components/legislator/bio";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  // Redirect to login page if not signed in
  if (!sessionData) {
    console.log("Not signed in. Redirecting to login page for authentication.");
  }

  return (
    <>
      <Head>
        <title>Legislator Dashboard</title>
        <meta
          name="Texas Legislator Dashboard"
          content="Dashboard to view TX legislator profiles"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Legislator />
      </main>
    </>
  );
};

export default Home;

const Legislator: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data: legislators } = api.legislator.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user === undefined,
    }
  );
  const legislatorBios = legislators?.map((legislator) => (
    <Link href={`/legislators/profile/${legislator.id}`}>
      <div className="card w-96 bg-neutral text-neutral-content">
        <h1 className="title card">
          {legislator.firstName} {legislator.lastName}
        </h1>
      </div>
    </Link>
  ));

  return <div>{legislatorBios}</div>;
};
