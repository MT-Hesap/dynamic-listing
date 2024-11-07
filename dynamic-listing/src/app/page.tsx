"use client";

import Header from "@/components/header";
import ProductListing from "@/dynamicListing/pages/listing/Index";
import { SendAsync } from "@/utils/axios";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const pagePath = usePathname();
  console.log(pagePath);
  const SENameEndpoint = pagePath[pagePath.length - 1];
  console.log("SENameEndpoint", SENameEndpoint);
  const activeSEName = SENameEndpoint.split(".")[0];
  console.log("activeSEName", activeSEName);

  const fetchPageTypePayload = {
    storeId: 5,
    slug: `${activeSEName}.html`,
  };

  const fetchPageType = async (payload: any) => {
    try {
      const response = await SendAsync({
        url: "/CmsTopicsPublish/getpagetypebyslug.json",
        method: "POST",
        data: payload,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPageType(fetchPageTypePayload);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <br />
          <ProductListing />
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        ............................................................................................................
      </footer>
      
    </div>
  );
};

export default Home;
