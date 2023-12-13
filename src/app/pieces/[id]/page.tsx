import { notFound } from 'next/navigation';
import { db } from '@/app/db';
import Link from 'next/link';
import * as actions from '@/actions';

interface PieceShowPageProps {
	params: {
		id: string;
	};
}

export default async function PieceShowPage(props: PieceShowPageProps) {
	await new Promise((r) => setTimeout(r, 1000));

	const piece = await db.pieces.findFirst({
		where: { id: parseInt(props.params.id) },
	});

	if (!piece) {
		return notFound();
	}

	const deletePieceAction = actions.deletePiece.bind(null, piece.id);

	return (
		<div>
			<div className="flex m-4 justify-between items-center">
				<div className="text-xl font-bold">{piece.title}</div>
				<div className="flex gap-4">
					<Link
						href={`/pieces/${piece.id}/edit`}
						className="p-2 border rounded"
					>
						Edit
					</Link>
					<form action={deletePieceAction}>
						<button className="p-2 border rounded">Delete</button>
					</form>
				</div>
			</div>
			<pre className="p-3 border rounded bg-gray-200 border-gray-200">
				<code>{piece.code}</code>
			</pre>
		</div>
	);
}

export async function generateStaticParams() {
	const pieces = await db.pieces.findMany();

	return pieces.map((piece) => {
		return { id: piece.id.toString() };
	});
}
