import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import * as gtag from "@/libs/gtag";
import { SearchContext } from "@/context/searchContext";
import { SearchQuery } from "types";

function MyApp({ Component, pageProps }) {
  const [blogSearch, setBlogSearch] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const urlQuery = router.query as SearchQuery;
    if (urlQuery && urlQuery.keyword) {
      setBlogSearch(urlQuery.keyword);
    } else {
      setBlogSearch("");
    }
  }, [router]);

  return (
    <SearchContext.Provider
      value={{
        blogSearch,
        setBlogSearch,
      }}
    >
      <Component {...pageProps} />
    </SearchContext.Provider>
  );
}

export default MyApp;
