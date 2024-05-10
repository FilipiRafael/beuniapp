import { useContext } from "react";
import Image from "next/image";
import { Disclosure, Menu } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import beUniLogo from "@/assets/beunilogo.png";
import { AuthContext } from "@/contexts/auth";

export const Navbar = () => {
  const navigation = [
    { name: "Catálogo", current: true },
    { name: "Pedidos", current: false },
    { name: "Inventário", current: false },
    { name: "Envios", current: false },
    { name: "Integrações", current: false },
    { name: "Conta", current: false },
    { name: "Assinatura", current: false },
  ];
  const userNavigation = [{ name: "Sign out", onclick: () => logout() }];
  const { setUser, setIsAuth, user } = useContext(AuthContext);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const logout = async () => {
    localStorage.removeItem("sessionToken");
    setUser(null);
    setIsAuth(false);
  };

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    className="mx-auto h-8 w-auto"
                    src={beUniLogo}
                    alt="Your Company"
                    width={0}
                    height={0}
                    priority={false}
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "bg-orange-600 text-white"
                            : "text-gray-500",
                          "rounded-md px-3 py-2 text-sm font-medium cursor-pointer",
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative mr-3">
                    <div>
                      <Menu.Button className="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-10 w-10 rounded-full"
                          src="https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1714003200&semt=ais"
                          alt=""
                          width={0}
                          height={0}
                          unoptimized
                        />
                      </Menu.Button>
                    </div>
                  </Menu>
                  <button
                    type="button"
                    className="relative rounded-full bg-white p-1 text-gray-500"
                    onClick={logout}
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Logout</span>
                    <ArrowRightStartOnRectangleIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-orange-500 p-2 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  className={classNames(
                    item.current
                      ? "bg-orange-500 text-white"
                      : "text-gray-500 hover:bg-white/15",
                    "block rounded-md px-3 py-2 text-base font-medium",
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-orange-500 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full ring-2 ring-white"
                    src="https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1714003200&semt=ais"
                    alt=""
                    width={0}
                    height={0}
                    unoptimized
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-gray-600">
                    {user?.username?.match(/^[^@]+/)?.[0]}
                  </div>
                  <div className="mt-2 text-sm font-medium leading-none text-gray-600">
                    {user?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    onClick={item.onclick}
                    className="block rounded-sm px-3 py-2 text-base font-medium text-white bg-orange-500"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
