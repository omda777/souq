import dotenv from 'dotenv';
import { existsSync } from 'node:fs';
import path from 'node:path';

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const envFileName = environment === 'production' ? '.env.production' : '.env.development';
const envFilePath = path.resolve(process.cwd(), envFileName);

if (existsSync(envFilePath)) {
	dotenv.config({ path: envFilePath });
} else {
	dotenv.config();
}

export const appEnvironment = environment;

