import { useEffect, useState } from "react";

export const useFetch = <Data>(url: string): [Data | undefined, boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<Data>();

  const feching = async (url: string) => {
    await fetch(url)
      .then((res: Response) => res.json())
      .then((data: Data) => setFetchedData(data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    feching(url);
  }, [url]);

  return [fetchedData, isLoading];
};
