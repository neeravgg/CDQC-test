'use client';
import { AppDispatch, useAppSelector } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CommonForm from '../component/Common.Form';
import { z } from 'zod';
import { familyFormInterface, userFormInterface } from '@/types/form.types';
import Modal from 'react-modal';
import Accordion from '../component/Accordian';
import {
	addFamilyMember,
	deleteFamilyMember,
} from '@/redux/features/family.slice';
import { useRouter } from 'next/navigation';
import '@/styles/Button.style.css';

const formFields = [
	{
		name: 'member_first_name',
		label: `Member's First Name`,
		placeholder: `Enter member's first name`,
		type: 'text',
		validation: z
			.string()
			.min(3, `Member's first name must be at least 3 characters`),
	},
	{
		name: 'member_last_name',
		label: `Member's Last Name`,
		placeholder: `Enter member's last name`,
		type: 'text',
		validation: z
			.string()
			.min(3, `Member's last name must be at least 3 characters`),
	},
	{
		name: 'relation',
		label: 'Relationship',
		placeholder: 'Enter your relationship',
		type: 'text',
		validation: z.string().min(3, 'relationship must be at least 3 characters'),
	},
	{
		name: 'member_email',
		label: `Member's Email Address`,
		placeholder: `Enter member's email`,
		type: 'email',
		validation: z.string().email('Invalid email address'),
	},
];

const Family = () => {
	const router = useRouter();
	const [modalIsOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const { familyData } = useAppSelector((state) => state.family);
	const { isUserCompleted } = useAppSelector((state) => state.user);

	function openModal() {
		setIsOpen(true);
	}

	function routeHome() {
		router.push('/');
	}

	function closeModal() {
		setIsOpen(false);
	}

	function deleteFamily(id: number) {
		dispatch(deleteFamilyMember(id));
	}

	const onSubmit = (data: Record<string, any>) => {
		const familtData = data as familyFormInterface;
		dispatch(addFamilyMember(familtData));
		closeModal();
	};

	// side effects

	useEffect(() => {
		if (!isUserCompleted) {
			router.push('/user');
		}
	}, []);

	return (
		<div className='flex gap-20 min-h-screen flex-col items-start p-24 '>
			<div className='flex justify-between w-full'>
				<button className='create create-btn' onClick={openModal}>
					Add Member
				</button>
				<button
					className='create create-btn flex justify-center items-center gap-2'
					onClick={routeHome}
				>
					<svg
						width={16}
						height={16}
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 448 512'
						className=''
						style={{ transition: 'fill 0.3s', fill: 'currentColor' }}
						onMouseOver={(e) => (e.currentTarget.style.fill = '#000')}
						onMouseOut={(e) => (e.currentTarget.style.fill = 'currentColor')}
					>
						<path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z' />
					</svg>
					<span>Go Home</span>
				</button>
			</div>

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
				<CommonForm formTitle={'Family'} fields={formFields} onSubmit={onSubmit} />
			</Modal>
			<div className='flex flex-col items-center gap-3 w-full'>
				{familyData?.map((item, id) => (
					<Accordion
						key={item.member_first_name + id}
						title={item.member_first_name + ' ' + item.member_last_name}
					>
						<div className='flex flex-col'>
							<span>
								Name - {item.member_first_name + ' ' + item.member_last_name}
							</span>
							<span>Relationship - {item.relation}</span>
							<span>Email - {item.member_email}</span>
							<div className='flex w-full justify-end'>
								<svg
									width={20}
									height={20}
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 448 512'
									fill='red'
									className={` ${
										familyData?.length <= 1
											? ' opacity-50 cursor-not-allowed'
											: 'cursor-pointer'
									}`}
									{...(familyData?.length > 1 && { onClick: () => deleteFamily(id) })}
								>
									<path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z' />
								</svg>
							</div>
						</div>
					</Accordion>
				))}
			</div>
		</div>
	);
};

export default Family;
