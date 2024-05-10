import Image from "next/image";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

type ProductProps = {
  public_id: string;
  description: string;
  status: string;
  price: number;
  stock: number;
  image_url: string;
  id: string;
};

export const Product = ({
  public_id,
  price,
  stock,
  image_url,
  id,
}: ProductProps) => {
  return (
    <Link
      className="group relative cursor-pointer rounded-lg px-3 pt-3 pb-10 shadow-md shadow-gray-300/50"
      href={{
        pathname: "/product",
        query: {
          id,
        },
      }}
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          src={image_url}
          alt={public_id}
          className="h-80 w-full object-cover object-center group-hover:opacity-75"
          width={0}
          height={0}
          unoptimized
          priority={false}
        />
      </div>
      <h3 className="mt-4 text-md text-gray-700">{public_id}</h3>
      <p className="mt-3 text-sm text-gray-700">Estoque total: {stock}</p>
      <p className="mt-1 text-md text-gray-700">
        A partir de{" "}
        <span className="font-medium text-gray-900">
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </p>
      <PlusCircleIcon
        className="text-orange-500 absolute bottom-3 right-3 h-12 w-12"
        aria-hidden="true"
      />
    </Link>
  );
};
