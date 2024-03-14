import React, { FC, ReactNode, useState } from 'react';
import '@/styles/Accordion.style.css';
interface Accordion {
	title: string;
	children: ReactNode;
}

const Accordion: FC<Accordion> = ({ title, children }) => {
	const [isOpen, setOpen] = useState(false);
	return (
		<div className='accordion-wrapper'>
			<div
				className={`accordion-title ${isOpen ? 'open' : ''}`}
				onClick={() => setOpen(!isOpen)}
			>
				{title}
			</div>
			<div className={`accordion-item ${!isOpen ? 'collapsed' : ''}`}>
				<div className='accordion-content'>{children}</div>
			</div>
		</div>
	);
};

export default Accordion;
