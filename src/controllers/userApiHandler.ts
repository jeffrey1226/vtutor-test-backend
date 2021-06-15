import { APIGatewayEvent } from 'aws-lambda';
import { USER_ENDPOINT, USER_DETAIL_ENDPOINT, USER_ID, UUID_PATTERN } from '../constants';
import { errorResponse, notFoundResponse, okResponse } from '../utils';
import { UserInterface } from '../interfaces';
import { ValidatorUtil as vu } from '../utils/validator.util';
import { UserCreateRequest, UserUpdateRequest } from '../interfaces';
import { UserService } from '../services/user.service';

const userService = UserService.getInstance();

export const handler = async (event: APIGatewayEvent): Promise<any> => {
	try {
		switch (event.resource) {
			case USER_ENDPOINT:
				if (event.httpMethod === 'GET') {
					return await fetchUsers(event);
				} else if (event.httpMethod === 'POST') {
					return await createUser(event);
				}
				break;
			case USER_DETAIL_ENDPOINT:
				if (event.httpMethod === 'GET') {
					return await fetchUserByUserId(event);
				} else if (event.httpMethod === 'PUT') {
					return await updateUser(event);
				} else if (event.httpMethod === 'DELETE') {
					return await deleteUser(event);
				}
				break;
		}
		return notFoundResponse(`Resource not found : [${event.httpMethod}] ${event.resource}`);
	} catch (err) {
		console.log(JSON.stringify(err));
		return errorResponse(err);
	}
};

const createUser = async (event: APIGatewayEvent): Promise<UserInterface> => {
	const request: UserCreateRequest = new UserCreateRequest(event.body);
	const user: UserInterface = await userService.createUser(request);
	return okResponse(user);
};

const fetchUsers = async (event: APIGatewayEvent): Promise<any> => {
	const users: UserInterface[] = await userService.fetchUsers();
	return okResponse(users);
};

const fetchUserByUserId = async (event: APIGatewayEvent): Promise<any> => {
	const userId: string = vu.validateParam(event.pathParameters, USER_ID, true, UUID_PATTERN);
	const user: UserInterface = await userService.fetchUserByUserId(userId);
	return okResponse(user);
};

const updateUser = async (event: APIGatewayEvent): Promise<any> => {
	const userId: string = vu.validateParam(event.pathParameters, USER_ID, true, UUID_PATTERN);
	const request: UserUpdateRequest = new UserUpdateRequest(event.body);
	const user: UserInterface = await userService.updateUser(userId, request);
	return okResponse(user);
};

const deleteUser = async (event: APIGatewayEvent): Promise<any> => {
	const userId: string = vu.validateParam(event.pathParameters, USER_ID, true, UUID_PATTERN);
	const user: UserInterface = await userService.deleteUser(userId);
	return okResponse(user);
};
