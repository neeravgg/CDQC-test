import React, { FC } from 'react';
import { Product } from '../../types/Product';
import { StyledCard } from '../../styles/Card.style';

interface CardProps {
	details: Product;
}
const Card: FC<CardProps> = ({ details }) => {
	return (
		<StyledCard>
			<div className='card'>
				<img src={details.thumbnail} />
				<div className='card-body'>
					<div className=' flex justify-between'>
						<h2>{details.title}</h2>
						<h2 className=' font-bold'>$ {details.price}</h2>
					</div>
					<div className='mt-2'>
						<p>{details.brand}</p>
						<p className=' capitalize'>{details.category}</p>
					</div>
					<h5 className=' text-center'>{details.description}</h5>
				</div>
			</div>
		</StyledCard>
	);
};

export default Card;
