// "use client";

// import { useEffect, useState } from "react";

// type GithubStarsSimpleProps = {
//     username: string;
//     repo: string;
// };

// export default function GithubStarsSimple({
//     username,
//     repo,
// }: GithubStarsSimpleProps) {
//     const [stars, setStars] = useState<number | null>(null);

//     useEffect(() => {
//         fetch(`https://api.github.com/repos/${username}/${repo}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data?.stargazers_count) {
//                     setStars(data.stargazers_count);
//                 }
//             })
//             .catch(console.error);
//     }, [username, repo]);

//     // if (stars === null) return null;
//     if (stars === null) return <span>⭐ 0</span>;

//     return <span>
//         ⭐ {Intl.NumberFormat("en", { notation: "compact" }).format(stars)}
//     </span>;
// }

import { Star } from "lucide-react";

async function getStars(username: string, repo: string) {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repo}`,
    {
      next: { revalidate: 60 },
    }
  );

  const data = await res.json();
  return data?.stargazers_count ?? 0;
}

type Props = {
  username: string;
  repo: string;
};

export default async function GithubStars({ username, repo }: Props) {
  const stars = await getStars(username, repo);

  return (
    <span className="flex items-center gap-1 text-sm">
      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
      {Intl.NumberFormat("en", { notation: "compact" }).format(stars)}
    </span>
  );
}
