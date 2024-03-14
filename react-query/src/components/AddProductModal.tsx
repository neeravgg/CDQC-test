import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Modal from 'react-modal';
import { addProducts } from '../api';
import { ButtonAnimatedStyles } from '../styles/ButtonAnimated.styled';
import CommonForm from './Common/Common.Form';
import { z } from 'zod';
import { FetchProduct, Product } from '../types/Product';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addProduct } from '../redux/features/product.slice';

const formFields = [
	{
		name: 'title',
		label: `Title`,
		placeholder: `Enter title`,
		type: 'text',
		validation: z.string().min(3, `Title must be at least 3 characters`),
	},
	{
		name: 'description',
		label: `Description`,
		placeholder: `Enter description`,
		type: 'text',
		validation: z.string().min(10, `Description must be at least 10 characters`),
	},
	{
		name: 'price',
		label: 'Price',
		placeholder: 'Enter price',
		type: 'number',
		validation: z.number(),
	},
	{
		name: 'brand',
		label: `Brand`,
		placeholder: `Enter brand`,
		type: 'text',
		validation: z.string().min(3, `Brand must be at least 3 characters`),
	},
	{
		name: 'category',
		label: `Category`,
		placeholder: `Enter category`,
		type: 'text',
		validation: z.string().min(3, `category must be at least 3 characters`),
	},
	{
		name: 'thumbnail',
		label: `Thumbnail`,
		placeholder: `Enter thumbnail`,
		type: 'text',
		validation: z.string().regex(/^https[^?]*(?:jpg|jpeg|png)$/i),
	},
];
const AddProductModal = () => {
	const dispatch = useDispatch<AppDispatch>();
	const queryClient = useQueryClient();
	const [modalIsOpen, setIsOpen] = useState(false);
	const { mutateAsync: addProductMutation } = useMutation({
		mutationFn: addProducts,
		onSuccess: (response) => {
			const productData: Product = response.data;

			// Get the current products from the cache
			const currentProducts: FetchProduct = queryClient.getQueryData([
				'productList',
				0,
			]);

			if (currentProducts) {
				// Clone the current products array and add the new product to it
				const updatedProducts = [productData, ...currentProducts.products];
				const newData = { ...currentProducts, products: updatedProducts };
				// Update the products data in the cache
				queryClient.setQueryData(['productList', 0], newData);
			}
		},
	});

	function openModal() {
		setIsOpen(true);
	}
	function closeModal() {
		setIsOpen(false);
	}
	const onSubmit = (data: Record<string, any>) => {
		const ProductData = data as Product;
		addProductMutation(ProductData);
		// dispatch(addProduct(ProductData));
		closeModal();
	};
	return (
		<div>
			<ButtonAnimatedStyles>
				<button className='create create-btn' onClick={openModal}>
					Add Product
				</button>
			</ButtonAnimatedStyles>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={{
					content: {
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						marginRight: '-50%',
						transform: 'translate(-50%, -50%)',
						height: '80%',
						width: '50%',
					},
				}}
				contentLabel='Example Modal'
			>
				<button className='text-end w-full text-3xl' onClick={closeModal}>
					X
				</button>
				<CommonForm
					formTitle={'New Product'}
					fields={formFields}
					onSubmit={onSubmit}
				/>
			</Modal>
		</div>
	);
};

export default AddProductModal;
