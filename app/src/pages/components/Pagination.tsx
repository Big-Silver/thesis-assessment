import React from "react";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

interface PaginationProps {
  pageNo: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageNo,
  totalPages,
  onPageChange,
}) => {
  const isFirstPage = pageNo === 1;
  const isLastPage = pageNo === totalPages;

  return (
    <ul className="flex items-center space-x-4">
      <li>
        <button
          className={`py-2 px-4 rounded-md ${
            isFirstPage
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-white text-gray-700"
          }`}
          onClick={() => onPageChange(Math.max(1, pageNo - 1))}
          disabled={isFirstPage}
        >
          <RiArrowLeftLine className="text-[21px]" />
        </button>
      </li>
      <li>
        <span className="text-gray-700">
          Page {pageNo} of {totalPages}
        </span>
      </li>
      <li>
        <button
          className={`py-2 px-4 rounded-md ${
            isLastPage
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-white text-gray-700"
          }`}
          onClick={() => onPageChange(Math.min(totalPages, pageNo + 1))}
          disabled={isLastPage}
        >
          <RiArrowRightLine className="text-[21px]" />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
