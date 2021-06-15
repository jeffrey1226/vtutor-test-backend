import { BadRequestException } from './response.util';

export class ValidatorUtil {

	static validateStringPattern(str: string, format: string | RegExp): boolean {
		if (!str) {
			return false;
		}
		const regex = new RegExp(format);
		return regex.test(str);
	}

	static validateParam(params: any, param: string, isRequired: boolean, format: string | RegExp): string {
		const value: string = params ? params[param] : null;
		if (value) {
			if (format && !this.validateStringPattern(value, format)) {
				throw new BadRequestException(`Invalid Parameter : ${param}`);
			}
		} else {
			if (isRequired) {
				throw new BadRequestException(`Missing Parmeter : ${param}`);
			}
		}
		return value;
	}

	/**
	 * Validate that object is defined.
	 *
	 * @param value
	 */
	static notNull(value: any): boolean {
		return value !== undefined && value !== null;
	}

	/**
	 * Validate that string is not-null and not-blank.
	 *
	 * @param value
	 */
	static notBlank(value: string): boolean {
		return this.notNull(value) && value.trim().length > 0;
	}

	/**
	 * Validate that array is not-null and not-empty.
	 *
	 * @param values
	 */
	static notEmpty(values: any[]): boolean {
		return this.notNull(values) && values.length > 0;
	};

	/**
	 * Validate that object is null, undefined or blank.
	 *
	 * @param value
	 */
	static isBlank(value: string): boolean {
		return value === undefined || value === null || value.trim().length === 0;
	}

	/**
	 * Validate that object is null, undefined or empty.
	 *
	 * @param value
	 */
	static isEmpty(value: any[]): boolean {
		return value === undefined || value === null || value.length === 0;
	}

	/**
	 * Validate that object is null or undefined.
	 *
	 * @param value
	 */
	static isNull(value: any): boolean {
		return value === undefined || value === null;
	}

	/**
	 * Checks whether the given array is undefined, null or empty.
	 *
	 * @param arr
	 */
	static isNullOrBlank(arr: any[]): boolean {
		return !arr || arr.length === 0;
	};

	static compareStringArray(array1: string[], array2: string[]): boolean {
		if (array1.length !== array2.length) {
			return false;
		}
		for (let i = 0; i < array1.length; i++) {
			if (array1[i] !== array2[i]) {
				return false;
			}
		}
		return true;
	};
}
