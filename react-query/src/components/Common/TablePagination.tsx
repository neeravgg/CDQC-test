import React from 'react';
import ReactPaginate from 'react-paginate';
import { StyledPagination } from '../../styles/Pagination.styled';

interface PaginationProps {
	pageCount: number;
	handlePageClick: (selectedPage: string, page?: number) => void;
	selectedPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
	pageCount,
	handlePageClick,
	selectedPage,
}) => {
	const handleNextPage = () => {
		// Increment the selected page by 10
		handlePageClick('increment');
	};

	const handlePreviousPage = () => {
		// Decrement the selected page by 10
		handlePageClick('decrement');
	};

	const handleExactClick = (page: number) => {
		// Decrement the selected page by 10
		handlePageClick('exact', page);
	};

	return (
		<StyledPagination>
			<div className='paginate'>
				<ReactPaginate
					previousLabel={<button onClick={handlePreviousPage}>Previous</button>}
					nextLabel={<button onClick={handleNextPage}>Next</button>}
					pageCount={pageCount}
					onPageChange={(selected) => handleExactClick(selected.selected)}
					containerClassName={'pagination'}
					previousLinkClassName={'pagination__link'}
					nextLinkClassName={'pagination__link'}
					disabledClassName={'pagination__link--disabled'}
					activeClassName={'pagination__link--active'}
					// forcePage={selectedPage / 10}
				/>
			</div>
		</StyledPagination>
	);
};

export default Pagination;
