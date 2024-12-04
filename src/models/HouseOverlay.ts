import type { Element } from './Element';
import type { House } from './House';
import type { Person } from './Person';
import type { Placement } from './Placement';

/**
 * Represents a house and a placement overlay between two people.
 */
export class HouseOverlay {
	private readonly personHouse: Person;
	private readonly personPlacement: Person;
	private readonly house: House;
	private readonly element: Element;
	private readonly placement: Placement;
	private readonly calculatedStat: number;

	/**
	 * Represents a successful house overlay.
	 * @param personHouse the person whose house is part of the overlay.
	 * @param personPlacement the person whose placement is part of the overlay.
	 * @param house the house of the overlay.
	 * @param element the person's element or sign associated with the placement.
	 * For example, you could have "Rising" as element and "Leo" as the placement.
	 * @param placement the placement of the overlay.
	 * @param calculatedStat the calculated stat after having applied all its modifiers.
	 */
	constructor(
		personHouse: Person,
		personPlacement: Person,
		house: House,
		element: Element,
		placement: Placement,
		calculatedStat: number
	) {
		this.personHouse = personHouse;
		this.personPlacement = personPlacement;
		this.house = house;
		this.element = element;
		this.placement = placement;
		this.calculatedStat = calculatedStat;
	}

	/**
	 * Get the person whose house is part of the overlay.
	 * @returns the person whose house is part of the overlay.
	 */
	public getPersonHouse(): Person {
		return this.personHouse;
	}

	/**
	 * Get the person whose placement is part of the overlay.
	 * @returns the person whose placement is part of the overlay.
	 */
	public getPersonPlacement(): Person {
		return this.personPlacement;
	}

	/**
	 * Get the house of the overlay.
	 * @returns the house of the overlay.
	 */
	public getHouse(): House {
		return this.house;
	}

	/**
	 * Get the element of the placement.
	 * @returns the element of the placement.
	 */
	public getElement(): Element {
		return this.element;
	}

	/**
	 * Get the placement of the overlay.
	 * @returns the placement of the overlay.
	 */
	public getPlacement(): Placement {
		return this.placement;
	}

	/**
	 * Gets the calculated stat of this overlay.
	 * @returns the calculated stat of this overlay.
	 */
	public getCalculatedStat(): number {
		return this.calculatedStat;
	}
}
