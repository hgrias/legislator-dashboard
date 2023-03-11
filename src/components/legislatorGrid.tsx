import LegislatorContext from "./legislator/legislatorContext";
import Bio from "./legislator/bio";
import { api } from "~/utils/api";
import Link from "next/link";

export const LegislatorGrid: React.FC = () => {
  const { data: legislators } = api.legislator.getAll.useQuery();
  const legislatorCards = legislators?.map((legislator) => (
    <div key={legislator.id}>
      <LegislatorContext.Provider value={legislator}>
        <Link href={`/legislators/profile/${legislator.id}`}>
          <Bio />
        </Link>
      </LegislatorContext.Provider>
    </div>
  ));

  return <div className="grid grid-cols-3 gap-4">{legislatorCards}</div>;
};
