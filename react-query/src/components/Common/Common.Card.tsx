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
					<h2>{details.title}</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
						veniam.
					</p>
					<h5>{details.description}</h5>
				</div>
			</div>
		</StyledCard>
	);
};

export default Card;
