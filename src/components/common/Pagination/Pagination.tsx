import { FC } from 'react';
import ReactPaginate from 'react-paginate';

interface IPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: FC<IPaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
}) => {

  const pageCount = total > 0 ? Math.ceil(total / pageSize) : 1;

  const handlePageClick = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    <div className="flex justify-center mt-[40px]">
      <nav aria-label="Pagination">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          forcePage={page - 1}
          containerClassName="flex list-none"
          pageClassName="mx-1"
          pageLinkClassName="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
          activeClassName="border-[2px] border-[bg-blue-500] text-[#fff]"
          activeLinkClassName="border-[4px] border-[bg-blue-500] text-[#fff]"
          previousClassName="mx-1 cursor-pointer"
          previousLinkClassName="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white"
          nextClassName="mx-1 cursor-pointer"
          nextLinkClassName="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white"
          disabledClassName="opacity-50 pointer-events-none"
          breakClassName="mx-1"
          breakLinkClassName="px-3 py-1 border border-blue-500 text-blue-500 rounded"
        />
      </nav>
    </div>
  );
};

export default Pagination;
