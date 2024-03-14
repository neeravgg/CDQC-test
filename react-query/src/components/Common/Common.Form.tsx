import { FC, ReactNode, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { StyledRegister } from '../../styles/Form.styled';

interface Field {
	name: string;
	label: string;
	placeholder: string;
	type: string;
	validation: z.Schema;
}
interface ModularFormProps {
	formTitle: string;
	fields: Field[];
	onSubmit: (data: Record<string, any>) => void;
}
const defaultFieldSchema = z.string();

const CommonForm: FC<ModularFormProps> = ({ formTitle, fields, onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Record<string, any>>({
		resolver: zodResolver(
			z.object(
				fields.reduce((acc, field) => {
					acc[field.name] = field.validation || defaultFieldSchema;
					return acc;
				}, {} as Record<string, z.Schema>)
			)
		),
	});

	const processForm: SubmitHandler<Record<string, any>> = (data) => {
		onSubmit(data);
	};

	return (
		<StyledRegister>
			<section className='heading'>
				<h1>{formTitle}</h1>
			</section>
			<section className=''>
				<form onSubmit={handleSubmit(processForm)} className=''>
					{fields.map((field) => (
						<div key={field.name}>
							{field.label && (
								<label className='' htmlFor={field.name}>
									{field.label}
								</label>
							)}
							{field.type === 'text' ? (
								<input
									placeholder={field.placeholder || field.name}
									{...register(field.name)}
								/>
							) : field.type === 'number' ? (
								<input
									type='number'
									placeholder={field.placeholder || field.name}
									{...register(field.name, { valueAsNumber: true })}
								/>
							) : field.type === 'phone' ? (
								<input
									type='tel'
									placeholder={field.placeholder || field.name}
									{...register(field.name)}
								/>
							) : field.type === 'email' ? (
								<input
									type='email' // Set input type to email
									placeholder={field.placeholder || field.name}
									{...register(field.name)}
								/>
							) : null}
							{errors[field.name] && (
								<p className='text-xs text-red-400 text-start'>
									{errors[field.name]?.message as ReactNode}
								</p>
							)}
						</div>
					))}
					<button className='rounded-lg bg-black py-2 text-white'>Submit</button>
				</form>
			</section>
		</StyledRegister>
	);
};

export default CommonForm;
