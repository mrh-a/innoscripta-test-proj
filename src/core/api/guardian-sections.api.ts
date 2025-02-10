import { AxiosResponse } from "axios";
import { Http } from "./interceptors/http.interceptor";
import { IGuardianNewsResponse } from "../model/guardian.model";
import { useQuery } from "@tanstack/react-query";

export const GuardianGetSections = (): Promise<
  AxiosResponse<IGuardianNewsResponse>
> => {
  return Http.get(
    `${import.meta.env.VITE_GURADIAN_BASE_URL}/sections?api-key=${
      import.meta.env.VITE_GURADIAN_API_KEY
    }`
  );
};

export const useGuardianGetSections = () =>
  useQuery({
    queryKey: ["GuardianGetSections"],
    queryFn: GuardianGetSections,
    retry: 1,
    refetchOnWindowFocus: false,
  });