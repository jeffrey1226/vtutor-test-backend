import { UserInterface } from '../user.interface';
import { Enumed, NotBlank } from '../../decorators';
import { deepClone } from '../../utils';
import { ValidatorUtil as vu } from '../../utils/validator.util';
import { UserRole } from '../../enums';

export class UserCreateRequest {

	@NotBlank()
	username: string;

	@NotBlank()
	email: string;

	@NotBlank()
	full_name: string;

	@NotBlank()
	password: string;

	@Enumed(UserRole, false)
	role: UserRole;

	constructor(payload: string) {
		const request: UserCreateRequest = JSON.parse(payload);
		this.username = request.username;
		this.email = request.email;
		this.full_name = request.full_name;
		this.password = request.password;
		this.role = request.role;
	}

	mapUser(userId: string): UserInterface {
		const timestamp: number = Date.now();
		return {
			id: userId,
			username: this.username,
			email: this.email,
			full_name: this.full_name,
			password: this.password,
			role: this.role,
			createdAt: timestamp,
			updatedAt: timestamp
		};
	}
}

export class UserUpdateRequest {

	username: string;
	email: string;
	full_name: string;
	password: string;

	@Enumed(UserRole, true)
	role: UserRole;

	constructor(payload: string) {
		const request: UserUpdateRequest = JSON.parse(payload);
		this.username = request.username;
		this.email = request.email;
		this.full_name = request.full_name;
		this.password = request.password;
		this.role = request.role;
	}

	mapUser(prevUser: UserInterface): UserInterface {
		const user: UserInterface = deepClone(prevUser);
		if (vu.notBlank(this.username)) {
			user.username = this.username;
		}
		if (vu.notBlank(this.email)) {
			user.email = this.email;
		}
		if (vu.notBlank(this.full_name)) {
			user.full_name = this.full_name;
		}
		if (vu.notBlank(this.password)) {
			user.password = this.password;
		}
		if (vu.notNull(this.role)) {
			user.role = this.role;
		}
		user.updatedAt = Date.now();
		return user;
	}
}
