'use client';
import { AppDispatch, useAppSelector } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CommonForm from '../component/Common.Form';
import { z } from 'zod';
import { setUserData } from '@/redux/features/user.slice';
import { userFormInterface } from '@/types/form.types';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';

const Family = () => {
	const [modalIsOpen, setIsOpen] = useState(false);
	// const router = useRouter();
	// const dispatch = useDispatch<AppDispatch>();
	// const { isUserCompleted, userData } = useAppSelector((state) => state.user);

	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		// subtitle.style.color = '#f00';
	}

	function closeModal() {
		setIsOpen(false);
	}

	// const onSubmit = (data: Record<string, any>) => {
	// 	const userData = data as userFormInterface;
	// 	dispatch(setUserData(userData));
	// 	router.push('/family');
	// };

	return (
		<div className='flex justify-center'>
			<button onClick={openModal}>Open Modal</button>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={{
					content: {
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						marginRight: '-50%',
						transform: 'translate(-50%, -50%)',
					},
				}}
				contentLabel='Example Modal'
			>
				<button className='text-end' onClick={closeModal}>
					close
				</button>
				<CommonForm fields={formFields} onSubmit={onSubmit} />
			</Modal>
		</div>
	);
};

export default Family;
