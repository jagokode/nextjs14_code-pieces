'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/app/db';

export async function editPiece(id: number, code: string) {
	await db.pieces.update({
		where: { id },
		data: { code },
	});

	revalidatePath(`/pieces/${id}`);
	redirect(`/pieces/${id}`);
}

export async function deletePiece(id: number) {
	await db.pieces.delete({
		where: { id },
	});

	revalidatePath('/');
	redirect('/');
}

export async function createPiece(
	formState: { message: string },
	formData: FormData
) {
	try {
		// input validation
		const title = formData.get('title');
		const code = formData.get('code');

		if (typeof title !== 'string' || title.length < 3) {
			return { message: 'Title must be greater than 3 characters' };
		}

		if (typeof code !== 'string' || code.length < 10) {
			return { message: 'Code must be greater than 10 characters' };
		}

		// create a new record in db
		const piece = await db.pieces.create({
			data: {
				title,
				code,
			},
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return {
				message: error.message,
			};
		} else {
			return {
				message: 'Error',
			};
		}
	}

	revalidatePath('/');
	// redirect to homepage
	// redirect must be put outside 'trycatch'
	redirect('/');
}
