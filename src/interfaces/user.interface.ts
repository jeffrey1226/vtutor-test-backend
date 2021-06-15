import { UserRole } from '../enums';

export interface UserInterface {
	id: string;
	username: string;
	email: string;
	full_name: string;
	password: string;
	role: UserRole;
	createdAt: number;
	updatedAt: number;
}
