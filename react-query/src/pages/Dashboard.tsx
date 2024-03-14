import React, { useState } from 'react';
import AddProductModal from '../components/AddProductModal';
import ListProducts from '../components/ListProducts';

export default function Dashboard() {
	return (
		<div className='flex flex-col gap-16 p-5'>
			<AddProductModal />
			<ListProducts />
		</div>
	);
}
