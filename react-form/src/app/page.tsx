'use client';
import { useAppSelector } from '@/redux/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import '@/styles/Card.style.css';
import '@/styles/Button.style.css';

export default function Home() {
	const router = useRouter();
	const { isUserCompleted, userData } = useAppSelector((state) => state.user);

	const handleCreate = () => {
		router.push('/user');
	};
	const RouteFamily = () => {
		router.push('/family');
	};
	// useEffect(() => {
	// 	window.location.reload();
	// }, []);
	return (
		<main className='flex gap-20 min-h-screen flex-col items-start p-24 '>
			<button className='create create-btn' onClick={handleCreate}>
				Create
			</button>

			<div className='flex flex-col gap-5 justify-center items-center w-full '>
				{isUserCompleted ? (
					<>
						<div className='card-wrapper'>
							<div className='card-title'>User Details</div>
							<div className='card-content'>
								<span>Name - {userData.first_name + ' ' + userData.last_name}</span>
								<span>Email - {userData.email}</span>
								<span>Phone - {userData.phone_number}</span>
								<span>Address - {userData.address}</span>
							</div>
						</div>
						<button className='create create-btn' onClick={RouteFamily}>
							View Family
						</button>
					</>
				) : (
					<>
						<Image
							className='relative '
							src='/no-results.png'
							alt='no result'
							width={150}
							height={150}
							priority
						/>
						<span>No user, create one</span>
					</>
				)}
			</div>
		</main>
	);
}
