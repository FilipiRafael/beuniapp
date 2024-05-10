export const Breadcrumb = ({
  oldPage,
  newPage,
}: {
  oldPage: string;
  newPage: string;
}) => {
  return (
    <nav
      className="mt-6 flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <a
            href="/dashboard"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-orange-500 dark:text-gray-400 dark:hover:text-white"
          >
            {oldPage}
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <svg
              className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <a className="ms-1 text-sm font-medium text-gray-700 hover:text-orange-500 md:ms-2 dark:text-gray-400 dark:hover:text-white">
              {newPage}
            </a>
          </div>
        </li>
      </ol>
    </nav>
  );
};
