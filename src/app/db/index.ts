// Create Prisma Client

import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

// create a piece
db.pieces.create({
	data: {
		title: 'Codes',
		code: 'const fn = () => {}',
	},
});
