import * as uuid from 'uuid';

export * from './response.util';


/**
 * Verifies if the object contains the given path.
 *
 * @param obj: object
 * @param path: 'address.state.country'
 */
export const hasKey = (obj: any, path: string): boolean => {
	return path.split(".").every(function (x) {
		if (typeof obj !== 'object' || obj === null || !(x in obj))
			return false;
		obj = obj[x];
		return true;
	});
};

/**
 * Generate and return UUID v4.
 */
export const generateUUID = (): string => {
	return uuid.v4();
};

export const deepClone = <T>(obj: T): T => {
	return JSON.parse(JSON.stringify(obj));
};

export const capitalise = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Remove duplicates from string array.
 *
 * @param strArray
 */
export const removeDuplicates = (strArray: string[]): string[] => {
	return Array.from(new Set(strArray));
};

/**
 * Returns true if objects are equal, returns false if the objects are unequal.
 *
 * @param obj1
 * @param obj2
 */
export const compareObjects = (obj1: any, obj2: any): boolean => {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
};

/**
 * Returns last element of the array.
 *
 * @param items
 */
export const getLastElement = (items: any[]): any => {
	if (!items || items.length === 0) {
		return undefined;
	}
	return items[items.length - 1];
};
