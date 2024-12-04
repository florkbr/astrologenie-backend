import { Element } from './Element';
import type { Placement } from './Placement';
import { House } from './House';

export class Person {
	private readonly name: string;

	// The person's birth placements.
	private rising: Placement;
	private moon: Placement;
	private sun: Placement;
	private mars: Placement;
	private mercury: Placement;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private jupiter?: Placement;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private MC?: Placement;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private neptune?: Placement;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private pluto?: Placement;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private saturn?: Placement;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private uranus?: Placement;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private venus?: Placement;

	// The person's houses.
	private house_2: House;
	private house_3: House;
	private house_6: House;
	private house_10: House;
	private house_11: House;
	// optional
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private house_1?: House;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private house_4?: House;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private house_5?: House;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private house_7?: House;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private house_8?: House;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private house_9?: House;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private house_12?: House;

	// The following two will be initialized in a later stage.
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private dc?: Placement;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private ic?: Placement;

	constructor(
		name: string,
		rising: Placement,
		moon: Placement,
		sun: Placement,
		mars: Placement,
		mercury: Placement,
		house_2: House,
		house_3: House,
		house_6: House,
		house_10: House,
		house_11: House,
		jupiter?: Placement,
		mc?: Placement,
		neptune?: Placement,
		pluto?: Placement,
		saturn?: Placement,
		uranus?: Placement,
		venus?: Placement,
		house_1?: House,
		house_4?: House,
		house_5?: House,
		house_7?: House,
		house_8?: House,
		house_9?: House,
		house_12?: House
	) {
		// Save the person's name...
		this.name = name;

		// ... and its birth chart's placements.
		this.rising = rising;
		this.moon = moon;
		this.sun = sun;
		this.mars = mars;
		this.mercury = mercury;
		this.jupiter = jupiter;
		this.MC = mc;
		this.neptune = neptune;
		this.pluto = pluto;
		this.saturn = saturn;
		this.uranus = uranus;
		this.venus = venus;

		// ... and its houses.
		this.house_1 = house_1;
		this.house_2 = house_2;
		this.house_3 = house_3;
		this.house_4 = house_4;
		this.house_5 = house_5;
		this.house_6 = house_6;
		this.house_7 = house_7;
		this.house_8 = house_8;
		this.house_9 = house_9;
		this.house_10 = house_10;
		this.house_11 = house_11;
		this.house_12 = house_12;
	}

	public getName(): string {
		return this.name;
	}

	public getRising(): Placement {
		return this.rising;
	}

	public getMoon(): Placement {
		return this.moon;
	}

	public getSun(): Placement {
		return this.sun;
	}

	public getMars(): Placement {
		return this.mars;
	}

	public getMercury(): Placement {
		return this.mercury;
	}

	public setDC(dc: Placement): void {
		this.dc = dc;
	}

	public setIC(ic: Placement): void {
		this.ic = ic;
	}

	public getHouse2(): House {
		return this.house_2;
	}

	public getHouse3(): House {
		return this.house_3;
	}

	public getHouse6(): House {
		return this.house_6;
	}

	public getHouse10(): House {
		return this.house_10;
	}

	public getHouse11(): House {
		return this.house_11;
	}

	/**
	 * Gets all the placements of this person.
	 * @returns a map of the placements on the birth chart. The key
	 * of the map represents the element on the birth chart.
	 */
	public getAllPlacements(): Map<Element, Placement> {
		const placements = new Map<Element, Placement>();

		placements.set(Element.RISING, this.rising);
		placements.set(Element.MOON, this.moon);
		placements.set(Element.SUN, this.sun);
		placements.set(Element.MARS, this.mars);
		placements.set(Element.MERCURY, this.mercury);

		return placements;
	}

	/**
	 * Gets all the houses of this person.
	 * @returns a map of the houses on the birth chart. The key
	 * of the map represents the house on the birth chart.
	 */
	public getAllHouses(): Array<House> {
		const houses = new Array<House>();

		houses.push(this.house_2);
		houses.push(this.house_3);
		houses.push(this.house_6);
		houses.push(this.house_10);
		houses.push(this.house_11);

		return houses;
	}
}
