export interface Chat {
	id: number;
}

export enum UserRole {
	SYSTEM,
	HUMAN
}

export interface ChatDetails {
	id: number;
	role: UserRole;
	message: string;
}
