"use client";
 
import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"; //npm install react-icons --save npmjs com/package/react-icons
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx"; //npm i clsx npmjs com/package/clsx
 
export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }
 
  if (currentPage >= totalPages - 2) {
    return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
  }
 
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

const Paginationnumber = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
 
  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
 
  const allPages = generatePagination(currentPage, totalPages);
 
  const PaginationNumber = ({
    page,
    href,
    position,
    isActive,
  }: {
    page: number | string;
    href: string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
  }) => {
    const className = clsx(
      "page-item",
      {
        "": position === "first" || position === "single",
        "": position === "last" || position === "single",
        "active": isActive,
        "": !isActive && position !== "middle",
        "": position === "middle",
      }
    );
 
    return isActive && position === "middle" ? (
      <li className={className}><a className='page-link' href={isActive ? '#' : href}>{page}</a></li>
    ) : (
      <li className={className}><a className='page-link' href={isActive ? '#' : href}>{page}</a></li>
    );
  };
   
  const PaginationArrow = ({
    href,
    direction,
    isDisabled,
  }: {
    href: string;
    direction: "left" | "right";
    isDisabled?: boolean;
  }) => {
    const className = clsx(
      "page-item",
      {
        "disabled": isDisabled,
        "": !isDisabled,
        "mr-2": direction === "left",
        "ml-2": direction === "right",
      }
    );
 
    const icon =
      direction === "left" ? (
        <a className={isDisabled ? 'disabled page-link' : 'page-link'} href={href}>Prev</a>
      ) : (
        <a className={isDisabled ? 'disabled page-link' : 'page-link'} href={href}>Next</a>
      );
 
    return isDisabled ? (
      <li className={className}>{icon}</li>
    ) : (
      <li className={className}>{icon}</li>
    );
  };
 
  return (
    <ul className="pagination">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />
      {allPages.map((page, index) => {
        let position: "first" | "last" | "single" | "middle" | undefined;

        if (index === 0) position = "first";
        if (index === allPages.length - 1) position = "last";
        if (allPages.length === 1) position = "single";
        if (page === "...") position = "middle";

        return (
          <PaginationNumber
            key={index}
            href={createPageURL(page)}
            page={page}
            position={position}
            isActive={currentPage === page} 
          />
        );
      })}
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </ul>
  );
};
 
export default Paginationnumber;