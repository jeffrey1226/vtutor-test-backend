import { TABLE_NAME, HASH_KEY } from '../constants';
import { UserCreateRequest, UserUpdateRequest } from '../interfaces';
import { UserInterface } from '../interfaces';
import { generateUUID, ResourceNotFoundException } from '../utils';
import { DynamoService } from './dynamo.service';

export class UserService {

	private static instance: UserService;

	private readonly dynamo: DynamoService;

	private constructor() {
		this.dynamo = DynamoService.getInstance();
	}

	async createUser(request: UserCreateRequest): Promise<UserInterface> {
		const userId: string = generateUUID();
		const user: UserInterface = request.mapUser(userId);
		await this.dynamo.insert({
			Item: user,
			TableName: TABLE_NAME,
			ConditionExpression: `attribute_not_exists(${HASH_KEY})`,
			ReturnValues: 'NONE'
		});
		return user;
	}

	async fetchUsers(): Promise<UserInterface[]> {
		const users: UserInterface[] = await this.dynamo.scanAll({
			TableName: TABLE_NAME,
		});
		return users;
	}

	async fetchUserByUserId(userId: string): Promise<UserInterface> {
		const users: UserInterface[] = await this.dynamo.query({
			TableName: TABLE_NAME,
			KeyConditionExpression: `${HASH_KEY} = :hashKey`,
			ExpressionAttributeValues: { ':hashKey': userId },
			Limit: 1
		});
		if (users.length === 0) {
			throw new ResourceNotFoundException(`User ${userId} does not exist.`);
		}
		return users[0];
	}

	async updateUser(userId: string, request: UserUpdateRequest): Promise<UserInterface> {
		const prevUser: UserInterface = await this.fetchUserByUserId(userId);
		const newUser: UserInterface = request.mapUser(prevUser);
		await this.dynamo.insert({
			Item: newUser,
			TableName: TABLE_NAME,
			ConditionExpression: `attribute_exists(${HASH_KEY})`,
			ReturnValues: 'NONE'
		});
		return newUser;
	}

	async deleteUser(userId: string): Promise<UserInterface> {
		const user: UserInterface = await this.fetchUserByUserId(userId);
		await this.dynamo.delete({
			TableName: TABLE_NAME,
			Key: { id: user.id, username: user.username },
			ReturnValues: "ALL_OLD"
		});
		return user;
	}

	static getInstance(): UserService {
		if (!UserService.instance) {
			UserService.instance = new UserService();
		}
		return UserService.instance;
	}
}
