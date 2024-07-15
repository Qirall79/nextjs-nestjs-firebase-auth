import { getSession } from "@/lib/actions";
import { useEffect, useState } from "react";

export const useSession = () => {
  const [session, setSession] = useState<{uid: string} | null>(null);

  const retrieveSession = async () => {
    const res = await getSession();
	setSession(res)
  };

  useEffect(() => {
    retrieveSession();
  }, []);

  return [session, getSession];
};
