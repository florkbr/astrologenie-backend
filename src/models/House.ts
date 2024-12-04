import type { Element } from './Element';

export enum HouseNumber {
	HOUSE_1 = 1,
	HOUSE_2 = 2,
	HOUSE_3 = 3,
	HOUSE_4 = 4,
	HOUSE_5 = 5,
	HOUSE_6 = 6,
	HOUSE_7 = 7,
	HOUSE_8 = 8,
	HOUSE_9 = 9,
	HOUSE_10 = 10,
	HOUSE_11 = 11,
	HOUSE_12 = 12
}

export enum HouseStat {
	HOUSE_1 = 0,
	HOUSE_2 = 1,
	HOUSE_3 = 3,
	/* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
	HOUSE_4 = 0,
	/* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
	HOUSE_5 = 0,
	HOUSE_6 = 4,
	/* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
	HOUSE_7 = 0,
	/* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
	HOUSE_8 = 0,
	/* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
	HOUSE_9 = 0,
	HOUSE_10 = 5,
	/* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
	HOUSE_11 = 1,
	/* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
	HOUSE_12 = 0
}

export class House {
	private readonly number: number;
	private readonly element: Element;
	private readonly stat: number;

	/**
	 * Build a house object.
	 * @param number the number of the house.
	 * @param element the element or sign of the house.
	 */
	constructor(number: HouseNumber, element: Element) {
		this.number = number;
		this.element = element;
		this.stat = HouseStat[`HOUSE_${number}`];
	}

	public getNumber(): number {
		return this.number;
	}

	/**
	 * Get the house's sign.
	 * @returns the element or sign of the house.
	 */
	public getElement(): Element {
		return this.element;
	}

	public getStat(): number {
		return this.stat;
	}
}
