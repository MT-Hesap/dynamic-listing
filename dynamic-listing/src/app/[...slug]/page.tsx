import ProductListing from "@/dynamicListing/pages/listing/Index";
import { SendAsync } from "@/utils/axios";
import { permanentRedirect, RedirectType } from "next/navigation";

const GenerateDynamicPages = async ({
  params: { slug = [""] },
}: {
  params: { slug: string[] };
}): Promise<any> => {
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

  //   console.log("firstslug", slug);

  const SENameEndpoint = slug[slug.length - 1];
  //   console.log("SENameEndpoint", SENameEndpoint);
  const activeSEName = SENameEndpoint.split(".")[0];
  //   console.log("activeSEName", activeSEName);

  const fetchPageTypePayload = {
    storeId: 5,
    slug: `${activeSEName}.html`,
  };

  const pageMetaData = await fetchPageType({
    storeId: 5,
    slug: `${activeSEName}.html`,
  });
  console.log("pageMetaData", pageMetaData);

  const data: any = pageMetaData;
  console.log("data", data?.type);

  if (data?.type === "Category") return <ProductListing />;
};

export default GenerateDynamicPages;
