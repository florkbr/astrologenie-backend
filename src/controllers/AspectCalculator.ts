import { DegreesCalculator } from './DegreesCalculator';
import { Aspect } from '../models/Aspect';
import { Element } from '../models/Element';
import type { Person } from '../models/Person';
import type { Placement } from '../models/Placement';
import { StatNature } from '../models/StatNature';

export class AspectCalculator {
	/**
	 * The largest allowed orb for the aspects.
	 */

	private readonly LARGEST_ALLOWED_ORB: number = 10;

	/**
	 * The list of malefic planets that can alter a stat's nature.
	 */
	private readonly MALEFIC_PLANETS = [
		Element.MARS,
		Element.NEPTUNE,
		Element.PLUTO,
		Element.SATURN,
		Element.URANUS
	];

	/**
     * Uncomment when the DC and IC elements become relevant.
     * 
     * The list of elements to be skipped to be counted when calculating the stats.
     * For now we will keep it only for the birth elements.
     *
    private readonly SKIPPABLE_ELEMENTS = [Element.DC, Element.IC];
    */

	/**
	 * Positive stats holder.
	 */
	private positiveStats: Map<Element, number> = new Map<Element, number>();
	/**
	 * Negative stats holder.
	 */
	private negativeStats: Map<Element, number> = new Map<Element, number>();

	/**
	 * Get the calculated positive stats.
	 * @returns the calculated positive stats.
	 */
	public getPositiveStats(): Map<Element, number> {
		return this.positiveStats;
	}

	/**
	 * Get the calculated negative stats.
	 * @returns the calculated negative stats.
	 */
	public getNegativeStats(): Map<Element, number> {
		return this.negativeStats;
	}

	/**
	 * Given two people, it calculates the common aspects of both and generates
	 * positive and negative stats on each element.
	 * @param firstPerson the first person to process.
	 * @param secondPerson the second person to process.
	 */
	public processPeople(firstPerson: Person, secondPerson: Person): void {
		// Reinitialize the stats every time we process new pairs of people.
		this.positiveStats = new Map<Element, number>();
		this.negativeStats = new Map<Element, number>();

		const degreesCalculator = new DegreesCalculator();

		// Calculate and update the people's birth placements.
		degreesCalculator.calculateTotalDegrees(firstPerson);
		degreesCalculator.calculateTotalDegrees(secondPerson);

		// Uncomment if it becomes relevant to calculate the DC and IC positions.
		//
		// Add DC and IC to both persons, based on the ASC and MC positions.
		// degreesCalculator.calculateDCandIC(firstPerson);
		// degreesCalculator.calculateDCandIC(secondPerson);

		const firstPersonPlacements: Map<Element, Placement> = firstPerson.getAllPlacements();
		const secondPersonPlacements: Map<Element, Placement> = secondPerson.getAllPlacements();

		const aspects: Array<Aspect> = Aspect.ALL_ASPECTS;
		for (const [firstElement, firstPlacement] of firstPersonPlacements.entries()) {
			for (const [secondElement, secondPlacement] of secondPersonPlacements.entries()) {
				for (const aspect of aspects) {
					if (this.arePlacementsInAspect(aspect, firstPlacement, secondPlacement)) {
						// Uncoment if it becomes relevant to take DC and IC positions into account.
						//
						// The DC and IC elements should not be compared. However, their aspects might be useful
						// in the future, that is why it is left here just in case.
						// if (this.shouldSkipElement(firstElement) || this.shouldSkipElement(secondElement)) {
						//    break;
						//}

						const orb: number = this.calculateTotalOrb(aspect, firstPlacement, secondPlacement);
						this.calculateStat(aspect, orb, firstElement, secondElement);
					}
				}
			}
		}
	}

	/**
	 * Checks whether the specified aspect is valid for the given placements.
	 * @param aspect the aspect to check.
	 * @param firstPlacement the first placement.
	 * @param secondPlacement the second placement.
	 * @returns true if the placements are considered to be in the given aspect.
	 */
	private arePlacementsInAspect(
		aspect: Aspect,
		firstPlacement: Placement,
		secondPlacement: Placement
	): boolean {
		// Calculate the lower and upper limits.
		const aspectDegree: number = aspect.getDegree();
		const allowedOrb: number = aspect.getAllowedOrb();

		const lowerLimit: number = aspectDegree - allowedOrb;
		const upperLimit: number = aspectDegree + allowedOrb;

		const largetPlacement: number = Math.max(
			firstPlacement.getDegrees(),
			secondPlacement.getDegrees()
		);
		const smallerPlacement: number = Math.min(
			firstPlacement.getDegrees(),
			secondPlacement.getDegrees()
		);

		// Firstly check regularly and then in case the aspect is reversed.
		if (
			largetPlacement >= smallerPlacement + lowerLimit &&
			largetPlacement <= smallerPlacement + upperLimit
		) {
			return true;
		} else if (
			largetPlacement >= smallerPlacement + (360 - aspectDegree) - allowedOrb &&
			largetPlacement <= smallerPlacement + (360 - aspectDegree) + allowedOrb
		) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Calculates the real orb between two placements for an already confirmed aspect.
	 * @param aspect the aspect to calculate the orb from.
	 * @param firstPlacement the first placement to calculate the orb from.
	 * @param secondPlacement the second placement to calculate the orb from.
	 * @returns the real orb between the given placements relative to the given aspect.
	 */
	private calculateTotalOrb(
		aspect: Aspect,
		firstPlacement: Placement,
		secondPlacement: Placement
	): number {
		const largerDegree: number = Math.max(
			firstPlacement.getDegrees(),
			secondPlacement.getDegrees()
		);
		const smallerDegree: number = Math.min(
			firstPlacement.getDegrees(),
			secondPlacement.getDegrees()
		);

		// First check the orb in case the placements are reversed. Then check for the regular placements.
		if (largerDegree - smallerDegree - aspect.getDegree() > this.LARGEST_ALLOWED_ORB) {
			return largerDegree - smallerDegree - (360 - aspect.getDegree());
		} else {
			return largerDegree - smallerDegree - aspect.getDegree();
		}
	}

	/**
	 * Calculates the stat depending on the aspect, orb, and the nature of the aspect.
	 * @param aspect the aspect to check the nature from.
	 * @param orb the exact orb of the two placements.
	 * @param firstElement the first birth element.
	 * @param secondElement the second birth element.
	 */
	private calculateStat(
		aspect: Aspect,
		orb: number,
		firstElement: Element,
		secondElement: Element
	): void {
		// Calculate the modifier depending on the orb.
		let modifier: number;
		if (orb < 2) {
			modifier = 3;
		} else if (orb < aspect.getAllowedOrb() / 2 + 1) {
			modifier = 2;
		} else {
			modifier = 1;
		}

		const stat: number = aspect.getStat();
		const statNature: StatNature = this.calculateStatNature(aspect, firstElement, secondElement);

		if (statNature === StatNature.POSITIVE) {
			this.sumPositive(firstElement, secondElement, stat * modifier);
		} else if (statNature === StatNature.NEGATIVE) {
			this.sumNegative(firstElement, secondElement, stat * modifier);
		} else {
			this.sumPositive(firstElement, secondElement, (stat * modifier) / 2);
			this.sumNegative(firstElement, secondElement, (stat * modifier) / 2);
		}
	}

	/**
	 * Sums the given amount to the positive stats.
	 * @param firstElement the first birth element.
	 * @param secondElement the second birth element.
	 * @param amount the amount of units to increase the positive stats.
	 */
	private sumPositive(firstElement: Element, secondElement: Element, amount: number): void {
		let firstElementPositiveStat = this.positiveStats.get(firstElement);
		if (firstElementPositiveStat === undefined) {
			firstElementPositiveStat = 0;
		}

		this.positiveStats.set(firstElement, firstElementPositiveStat + amount);

		let secondElementPositiveStat = this.positiveStats.get(secondElement);
		if (secondElementPositiveStat === undefined) {
			secondElementPositiveStat = 0;
		}

		this.positiveStats.set(secondElement, secondElementPositiveStat + amount);
	}

	/**
	 * Sumes the given amount to the negative stats.
	 * @param firstElement the first birth element.
	 * @param secondElement the second birth element.
	 * @param amount the amount of units to increase the negative stats.
	 */
	private sumNegative(firstElement: Element, secondElement: Element, amount: number): void {
		let firstElementNegativeStat = this.negativeStats.get(firstElement);
		if (firstElementNegativeStat === undefined) {
			firstElementNegativeStat = 0;
		}

		this.negativeStats.set(firstElement, firstElementNegativeStat + amount);

		let secondElementNegativeStat = this.negativeStats.get(secondElement);
		if (secondElementNegativeStat === undefined) {
			secondElementNegativeStat = 0;
		}

		this.negativeStats.set(secondElement, secondElementNegativeStat + amount);
	}

	/**
	 * Check if the given element is a malefic planet.
	 * @param element element to check.
	 * @returns true if the element is a malefic planet.
	 */
	private isMaleficPlanet(element: Element): boolean {
		return this.MALEFIC_PLANETS.includes(element);
	}

	/**
     * Uncomment if it becomes relevant to take the DC and IC positions into account.
     * 
     * Checks if the given element should not be considered for the stats.
     * @param element element to check.
     * @returns true if the element has to be skipped.
     *
    private shouldSkipElement(element: Element): boolean {
        return this.SKIPPABLE_ELEMENTS.includes(element);
    }
    */

	/**
	 * Calculates the nature of the given aspect and the placements.
	 * @param aspect the aspect to check.
	 * @param firstPlacement the first placement to check.
	 * @param secondPlacement the second placement to check.
	 * @returns the nature of the given aspect and the placements.
	 */
	private calculateStatNature(
		aspect: Aspect,
		firstElement: Element,
		secondElement: Element
	): StatNature {
		switch (aspect) {
			case Aspect.CONJUNCTION:
				if (this.isMaleficPlanet(firstElement) || this.isMaleficPlanet(secondElement)) {
					return StatNature.MIXED;
				}

				return StatNature.POSITIVE;
			case Aspect.OPPOSITION:
				return StatNature.NEGATIVE;
			case Aspect.SQUARE:
				return StatNature.NEGATIVE;
			case Aspect.TRINE:
				return StatNature.POSITIVE;
			case Aspect.SEXTILE:
				return StatNature.POSITIVE;
			case Aspect.QUINTILE:
			case Aspect.BI_QUINTILE:
				return StatNature.POSITIVE;
			case Aspect.QUINCUNX:
			case Aspect.SEMI_SQUARE:
			case Aspect.SESQUI_QUADRATE:
			case Aspect.SEMI_SEXTILE:
				return StatNature.NEGATIVE;
		}

		// In theory this is unreachable code, because all the aspect types have
		// been covered in the "Switch" statement. However, we have to make the
		// compiler happy.
		return StatNature.POSITIVE;
	}
}
