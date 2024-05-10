"use client";

import { useLayoutEffect, useContext, useState, useEffect } from "react";
import { AuthContext } from "@/contexts/auth";
import { redirect, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { beUniApi } from "@/services/beUniApi";
import { Product } from "@/components/product";

type ProductsProps = {
  id: string;
  attributes: {
    record_id: string;
    public_id: string;
    description: string;
    status: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image_url: string;
    stock: number;
  };
};

export default function Dashboard() {
  const { isAuth } = useContext(AuthContext);
  const router = useRouter();
  const [products, setProducts] = useState<ProductsProps[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchString, setSearchString] = useState<string>("");

  const getProducts = async () => {
    const response = await beUniApi.get(
      `/products?filters[public_id][$contains]=${searchString}`,
      {
        headers: {
          Authorization: `Bearer eebde8ac830565995a0a1686232be8f6375f5c1c4031578f6ab1dc8548118eefbad045be7be38a08f11443219021acf8721bb674869d36194e4d16b1f66a3edea4b68ce85cc224c2850f21aafedaa42d3f3617ea3783168ea3e26b04cf24ebbbc39a7244513eec6fe9f61b2783649b0752ae0ac7007327dc7c21faeba6834664`,
        },
      },
    );

    setProducts(response.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [products]);

  useLayoutEffect(() => {
    if (!isAuth) redirect("/auth/login");
  }, [isAuth]);

  return (
    <div className="min-h-full">
      <Navbar />
      <header className="mt-5 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Monte aqui seu kit 🧡
          </h1>
          <p className="mt-3 w-full md:w-10/12 text-lg tracking-tight text-gray-500">
            Escolha abaixo os produtos que serão personalizados com sua marca e
            farão parte do seu kit.
          </p>
        </div>
      </header>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="w-full">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full d-flex flex-row">
            <input
              type="text"
              id="simple-search"
              className="outline-none w-full md:w-96 lg:w-96 mr-3 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 dark:bg-primary dark:border-gray-800 dark:text-gray-100 dark:ring-gray-500 dark:placeholder-gray-400 dark:focus:ring-offset-gray-900"
              placeholder="Search"
              required
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
        </div>
      </div>
      <main>
        {isLoading ? (
          <div className="h-96 flex flex-1 justify-center items-center">
            <svg
              aria-hidden="true"
              className="inline w-6 h-6 me-3 text-orange-500 animate-spin dark:text-gray-600 fill-white dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <div className="px-5 pb-10 md:px-10 lg:px-10 mt-10 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products?.map((product) => (
              <Product
                key={product.attributes.record_id}
                public_id={product.attributes.public_id}
                description={product.attributes.description}
                image_url={product.attributes.image_url}
                price={product.attributes.price}
                status={product.attributes.status}
                stock={product.attributes.stock}
                id={product.id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
