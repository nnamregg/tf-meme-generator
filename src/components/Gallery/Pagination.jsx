import { usePagination, DOTS } from "../../hooks/usePagination";
import { twMerge as tm } from "tailwind-merge";
import {
  MdOutlineArrowCircleLeft,
  MdOutlineArrowCircleRight,
} from "react-icons/md";

export default function Pagination({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage === lastPage) return;
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  const paginationItemClasses =
    "mx-auto my-auto box-border flex h-8 min-w-8 lg:mx-1 items-center rounded-2xl px-3 py-0 text-center text-xs lg:text-sm leading-snug tracking-tight cursor-pointer";

  const disabledClasses =
    "pointer-events-none hover:cursor-default hover:bg-transparent text-gray-800";

  const arrowClasses = "text-lg hover:text-teal-400";

  return (
    <ul className="mx-auto my-6 flex w-fit max-w-md list-none !text-gray-200">
      <li
        className={tm(
          paginationItemClasses,
          currentPage === 1 && disabledClasses,
        )}
        onClick={onPrevious}
      >
        <MdOutlineArrowCircleLeft className={arrowClasses} />
      </li>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={"pag-" + pageNumber + "item-" + index}
              className={tm(
                paginationItemClasses,
                "cursor-default hover:bg-transparent",
              )}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={"pag-" + pageNumber + "item-" + index}
            className={tm(
              paginationItemClasses,
              "hover:bg-teal-400/80 active:bg-teal-400",
              pageNumber === currentPage && "bg-teal-300 font-bold",
            )}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={tm(
          paginationItemClasses,
          currentPage === lastPage && disabledClasses,
        )}
        onClick={onNext}
      >
        <MdOutlineArrowCircleRight className={arrowClasses} />
      </li>
    </ul>
  );
}
