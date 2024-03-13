'use client';
import { useAppSelector } from '@/redux/store';
import { ButtonAnimatedStyles } from '@/styles/ButtonAnimated.styled';
import { StyledCard } from '@/styles/Card.style';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	const { isUserCompleted, userData } = useAppSelector((state) => state.user);

	const handleCreate = () => {
		router.push('/user');
	};
	const RouteFamily = () => {
		router.push('/family');
	};

	return (
		<main className='flex gap-20 min-h-screen flex-col items-start p-24 '>
			<ButtonAnimatedStyles>
				<button className='create create-btn' onClick={handleCreate}>
					Create
				</button>
			</ButtonAnimatedStyles>

			<div className='flex flex-col gap-5 justify-center items-center w-full '>
				{isUserCompleted ? (
					<>
						<StyledCard>
							<div className='card-wrapper'>
								<div className='card-title'>User Details</div>
								<div className='card-content'>
									<span>Name - {userData.first_name + ' ' + userData.last_name}</span>
									<span>Email - {userData.email}</span>
									<span>Phone - {userData.phone_number}</span>
									<span>Address - {userData.address}</span>
								</div>
							</div>
						</StyledCard>
						<ButtonAnimatedStyles>
							<button className='create create-btn' onClick={RouteFamily}>
								Family
							</button>
						</ButtonAnimatedStyles>
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
