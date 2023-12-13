import { db } from '@/app/db';
import EditPieceForm from '@/components/EditPieceForm';
import { notFound } from 'next/navigation';

interface EditPiecePageProps {
	params: {
		id: string;
	};
}

export default async function EditPiecePage(props: EditPiecePageProps) {
	const id = parseInt(props.params.id);

	// fetch data
	const piece = await db.pieces.findFirst({ where: { id } });

	if (!piece) {
		return notFound();
	}

	return (
		<div>
			<EditPieceForm piece={piece} />
		</div>
	);
}
