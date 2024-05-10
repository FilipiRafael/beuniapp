"use client";

import { useEffect, useState, useLayoutEffect, useContext } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { beUniApi, beUniApiKey } from "@/services/beUniApi";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/breadcrumb";
import { AuthContext } from "@/contexts/auth";

type ProductProps = {
  public_id: string;
  description: string;
  status: string;
  price: number;
  stock: number;
  image_url: string;
  id: string;
};

export default function Product({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { isAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductProps | null>(null);

  const getProduct = async () => {
    const response = await beUniApi.get(`/products/${searchParams.id}`, {
      headers: {
        Authorization: `Bearer ${beUniApiKey}`,
      },
    });

    setProduct(response.data.data.attributes);
    setIsLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  useLayoutEffect(() => {
    if (!searchParams.id || !isAuth) redirect("/auth/login");
  }, [isAuth, searchParams.id]);

  if (isLoading)
    return (
      <div className="flex flex-1 h-full justify-center items-center">
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
    );

  return (
    <div className="min-h-full">
      <Navbar />

      <Breadcrumb oldPage="Catálogo" newPage={product?.public_id as string} />

      <header className="mt-5 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {product?.public_id}
          </h1>
          <p className="mt-3 w-full md:w-10/12 text-lg tracking-tight text-gray-500">
            {product?.description}
          </p>
        </div>
      </header>
      <main>
        <div className="bg-white">
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg mx-3">
              {product?.image_url && product?.public_id && (
                <Image
                  src={product?.image_url}
                  alt={product?.public_id}
                  className="h-96 w-full object-cover object-center"
                  width={0}
                  height={0}
                  unoptimized
                  priority={false}
                />
              )}
            </div>
          </div>

          <div className="mx-auto md:ml-28 lg:ml-28 max-w-2xl px-4 pb-16 pt-10">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product?.public_id}
              </h1>
              <p className="text-3xl tracking-tight text-gray-900">
                {product?.price?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p className="text-gray-700 mt-10 md:mt-3 lg:mt-3">
                Estoque: {product?.stock}
              </p>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Informações do produto</h2>
              <button
                type="button"
                className="flex w-full md:w-1/2 lg:w-1/2 md:mt-10 lg:mt-10 items-center justify-center rounded-md border border-transparent bg-orange-500 px-8 py-3 text-base font-medium text-white hover:bg-orange-600 outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
