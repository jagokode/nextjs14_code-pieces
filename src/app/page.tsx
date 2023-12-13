import { db } from './db';
import Link from 'next/link';

export default async function Home() {
	// fetch data
	const pieces = await db.pieces.findMany();

	// render data
	const renderedPieces = pieces.map((piece) => {
		return (
			<Link
				className="flex justify-between items-center p-2 border rounded"
				href={`/pieces/${piece.id}`}
				key={piece.id}
			>
				<div>{piece.title}</div>
				<div>View</div>
			</Link>
		);
	});

	return (
		<div>
			<div className="flex m-2 justify-between items-center">
				<h1 className="font-bold text-2xl">Pieces</h1>
				<Link href="/pieces/new" className="border p-2 rounded">
					New
				</Link>
			</div>
			<div className="flex flex-col gap-2">{renderedPieces}</div>
		</div>
	);
}
