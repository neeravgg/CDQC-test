import React, { useState } from 'react';
import Card from './Common/Common.Card';
import { GridLoader } from 'react-spinners';
import { fetchProducts } from '../api';
import { useQuery } from '@tanstack/react-query';
import Pagination from './Common/TablePagination';

const ListProducts = () => {
	const [page, setPage] = useState(0);
	const {
		data: products,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ['productList', page],
		queryFn: () => fetchProducts(page),
		keepPreviousData: true,
		staleTime: Infinity,
		cacheTime: 0,
	});

	const onPaginationChange = (selected: string, page?: number) => {
		switch (selected) {
			case 'increment':
				setPage((prev) => prev + 10);
				break;
			case 'decrement':
				if (page >= 10) setPage((prev) => prev - 10);
				break;
			case 'exact':
				setPage(page * 10);
				break;

			default:
				break;
		}
	};

	return (
		<>
			<div className='flex flex-wrap justify-center'>
				{isLoading || isFetching ? (
					<div className='flex h-[50vh] w-screen items-center justify-center'>
						<GridLoader />
					</div>
				) : (
					<>
						{products?.products.length
							? products?.products.map((item) => <Card key={item.id} details={item} />)
							: null}
					</>
				)}
			</div>
			<div className='flex justify-center'>
				{products?.products.length && (
					<Pagination
						pageCount={products?.total}
						handlePageClick={onPaginationChange}
						selectedPage={(products.skip % 10) + 1}
					/>
				)}
			</div>
		</>
	);
};

export default ListProducts;
