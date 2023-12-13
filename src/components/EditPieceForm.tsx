'use client';

import type { Pieces } from '@prisma/client';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import * as actions from '@/actions';

interface EditPieceFormProps {
	piece: Pieces;
}

export default function EditPieceForm({ piece }: EditPieceFormProps) {
	const [code, setCode] = useState(piece.code);

	const handleEditorChange = (value: string = '') => {
		setCode(value);
	};

	const editPieceAction = actions.editPiece.bind(null, piece.id, code);

	return (
		<div>
			<Editor
				height="40vh"
				theme="vs-dark"
				defaultLanguage="javascript"
				defaultValue={piece.code}
				options={{ minimap: { enabled: false } }}
				onChange={handleEditorChange}
			/>
			<form action={editPieceAction}>
				<button type="submit" className="p-2 border rounded">
					Save
				</button>
			</form>
		</div>
	);
}
