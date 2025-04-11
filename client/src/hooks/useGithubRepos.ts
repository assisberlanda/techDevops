import { useQuery } from "@tanstack/react-query";

interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

export function useGithubRepos() {
  return useQuery<GithubRepo[]>({
    queryKey: ["/api/github/repos"],
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 10, // Refetch every 10 minutes
  });
}
