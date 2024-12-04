import { Element } from '../models/Element';
import type { Person } from '../models/Person';
import type { House } from '../models/House';
import type { Placement } from '../models/Placement';
import { HouseOverlay } from '../models/HouseOverlay';

export class HouseCalculator {
	/**
	 * Successful house overlays' holder.
	 */
	private houseOverlays: Array<HouseOverlay>;

	constructor() {
		this.houseOverlays = new Array<HouseOverlay>();
	}

	/**
	 * Get the house overlays that were collected after processing the given
	 * people.
	 * @returns an array of successful house overlays.
	 */
	public getHouseOverlays(): Array<HouseOverlay> {
		return this.houseOverlays;
	}

	/**
	 * Given two people, it calculates the houses to planet ruling of both and generates
	 * positive and negative stats on each.
	 * @param firstPerson the first person to process.
	 * @param secondPerson the second person to process.
	 */
	public processHousesToPlacements(firstPerson: Person, secondPerson: Person): void {
		// Initialize every time we process people.
		this.houseOverlays = new Array<HouseOverlay>();

		const firstPersonHouses: Array<House> = firstPerson.getAllHouses();
		const secondPersonPlacements: Map<Element, Placement> = secondPerson.getAllPlacements();

		for (const firstHouse of firstPersonHouses) {
			for (const [secondElement, secondPlacement] of secondPersonPlacements.entries()) {
				// Check if we have a placement in the house we are checking. If we do —yay!—,
				// we can calculate the stats for it.
				if (firstHouse.getElement() === secondPlacement.getElement()) {
					const calculatedStat: number = this.calculateStat(firstHouse, secondElement);

					this.houseOverlays.push(
						new HouseOverlay(
							firstPerson,
							secondPerson,
							firstHouse,
							secondElement,
							secondPlacement,
							calculatedStat
						)
					);
				}
			}
		}

		const secondPersonHouses: Array<House> = secondPerson.getAllHouses();
		const firstPersonPlacements: Map<Element, Placement> = firstPerson.getAllPlacements();

		for (const secondHouse of secondPersonHouses) {
			for (const [firstElement, firstPlacement] of firstPersonPlacements.entries()) {
				// Check if we have a placement in the house we are checking. If we do —yay!—,
				// we can calculate the stats for it.
				if (secondHouse.getElement() === firstPlacement.getElement()) {
					const calculatedStat: number = this.calculateStat(secondHouse, firstElement);

					this.houseOverlays.push(
						new HouseOverlay(
							secondPerson,
							firstPerson,
							secondHouse,
							firstElement,
							firstPlacement,
							calculatedStat
						)
					);
				}
			}
		}
	}

	/**
	 * Given an element that we know that it is on the other person's house, calculate
	 * the total weight.
	 * @param house the house of the first person.
	 * @param element the element in which the second person has a placement.
	 */
	private calculateStat(house: House, element: Element): number {
		// Each house has a stat associated, so we should be getting the one corresponding
		// to the number of the house.
		const houseStat: number = house.getStat();

		// Depending on which element is placed in the first person's house, we will apply
		// a different multiplier.
		let multiplier = 1;
		switch (element) {
			case Element.MARS:
				multiplier = 5;
				break;
			case Element.MERCURY:
				multiplier = 4;
				break;
			case Element.SUN:
			case Element.RISING:
			case Element.MOON:
				multiplier = 1;
				break;
		}

		return houseStat * multiplier;
	}
}
