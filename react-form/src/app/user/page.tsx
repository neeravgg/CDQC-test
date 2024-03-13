'use client';
import { AppDispatch, useAppSelector } from '@/redux/store';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CommonForm from '../component/Common.Form';
import { z } from 'zod';
import { setUserData } from '@/redux/features/user.slice';
import { userFormInterface } from '@/types/form.types';
import { useRouter } from 'next/navigation';

const formFields = [
	{
		name: 'first_name',
		label: 'First Name',
		placeholder: 'Enter your first name',
		type: 'text',
		validation: z.string().min(3, 'First name must be at least 3 characters'),
	},
	{
		name: 'last_name',
		label: 'Last Name',
		placeholder: 'Enter your last name',
		type: 'text',
		validation: z.string().min(3, 'Last name must be at least 3 characters'),
	},
	{
		name: 'email',
		label: 'Email Address',
		placeholder: 'Enter your email',
		type: 'email',
		validation: z.string().email('Invalid email address'),
	},
	{
		name: 'phone_number',
		label: 'Phone Number',
		placeholder: 'Enter your phone number',
		type: 'phone',
		validation: z.string().refine(
			(value) => {
				const phoneRegExp = /^\d{10}$/; // Simple 10-digit US phone number pattern
				return phoneRegExp.test(value);
			},
			{
				message: 'Invalid phone number format',
			}
		),
	},
	{
		name: 'address',
		label: 'Address',
		placeholder: 'Enter your address',
		type: 'text',
		validation: z.string().min(8, 'Address must be at least 8 characters'),
	},
];
const User = () => {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const { isUserCompleted, userData } = useAppSelector((state) => state.user);

	const onSubmit = (data: Record<string, any>) => {
		const userData = data as userFormInterface;
		dispatch(setUserData(userData));
		router.push('/family');
	};

	// side effects

	useEffect(() => {
		if (isUserCompleted) {
			router.push('/family');
		}
	}, []);

	return (
		<div className='flex justify-center h-100 mt-40'>
			<CommonForm formTitle='User' fields={formFields} onSubmit={onSubmit} />
		</div>
	);
};

export default User;
