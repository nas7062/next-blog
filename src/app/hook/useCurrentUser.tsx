import { useQuery } from "@tanstack/react-query";
import type { IUser } from "../_components/PostDetail";
import { getUserInfo } from "../_lib/getUser";
type UseCurrentUserResult = {
  user: IUser | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export function useCurrentUser(userEmail?: string): UseCurrentUserResult {
  const query = useQuery<IUser | null, Error>({
    queryKey: ["user", userEmail ?? null],
    enabled: !!userEmail,
    queryFn: async () => {
      const result = await getUserInfo(userEmail!);
      return result;
    },
    staleTime: 1000 * 60,
    initialData: null,
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error ?? null,
  };
}
