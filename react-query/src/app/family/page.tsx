'use client';
import { AppDispatch, useAppSelector } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CommonForm from '../component/Common.Form';
import { z } from 'zod';
import { familyFormInterface, userFormInterface } from '@/types/form.types';
import Modal from 'react-modal';
import { ButtonAnimatedStyles } from '@/styles/ButtonAnimated.styled';
import Accordion from '../component/Accordian';
import { addFamilyMember } from '@/redux/features/family.slice';
import { useRouter } from 'next/navigation';

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

	const onSubmit = (data: Record<string, any>) => {
		const familtData = data as familyFormInterface;
		dispatch(addFamilyMember(familtData));
		closeModal();
	};

	// side effects

	// useEffect(() => {
	// 	if (!isUserCompleted) {
	// 		router.push('/user');
	// 	}
	// }, []);

	return (
		<div className='flex gap-20 min-h-screen flex-col items-start p-24 '>
			<div className='flex justify-between w-full'>
				<ButtonAnimatedStyles>
					<button className='create create-btn' onClick={openModal}>
						Add Member
					</button>
				</ButtonAnimatedStyles>
				<ButtonAnimatedStyles>
					<button
						className='create create-btn flex justify-center items-center gap-2'
						onClick={routeHome}
					>
						<svg
							width={16}
							height={16}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 448 512'
						>
							<path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z' />
						</svg>
						<span>Go Home</span>
					</button>
				</ButtonAnimatedStyles>
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
						</div>
					</Accordion>
				))}
			</div>
		</div>
	);
};

export default Family;
