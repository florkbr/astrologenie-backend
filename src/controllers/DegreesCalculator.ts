import { Element } from '../models/Element';
import type { Placement } from '../models/Placement';
import type { Person } from '../models/Person';

export class DegreesCalculator {
	/**
	 * Takes the birth placements of the given person and calculates the total
	 * degrees of each placement in the astrological wheel.
	 * @param person the person to take the birth placements from.
	 */
	public calculateTotalDegrees(person: Person): void {
		const placements: Map<Element, Placement> = person.getAllPlacements();

		for (const placement of placements.values()) {
			let calculatedDegrees = 0;
			const placementDegrees = placement.getDegrees();

			switch (placement.getElement()) {
				case Element.ARIES:
					calculatedDegrees = placementDegrees;
					break;
				case Element.TAURUS:
					calculatedDegrees = placementDegrees + 30;
					break;
				case Element.GEMINI:
					calculatedDegrees = placementDegrees + 60;
					break;
				case Element.CANCER:
					calculatedDegrees = placementDegrees + 90;
					break;
				case Element.LEO:
					calculatedDegrees = placementDegrees + 120;
					break;
				case Element.VIRGO:
					calculatedDegrees = placementDegrees + 150;
					break;
				case Element.LIBRA:
					calculatedDegrees = placementDegrees + 180;
					break;
				case Element.SCORPIO:
					calculatedDegrees = placementDegrees + 210;
					break;
				case Element.SAGITTARIUS:
					calculatedDegrees = placementDegrees + 240;
					break;
				case Element.CAPRICORN:
					calculatedDegrees = placementDegrees + 270;
					break;
				case Element.AQUARIUS:
					calculatedDegrees = placementDegrees + 300;
					break;
				case Element.PISCES:
					calculatedDegrees = placementDegrees + 330;
					break;
			}

			placement.setDegrees(calculatedDegrees);
		}
	}

	/**
     * Unused for now, since we don't need it for our calculations.
     * 
     * Calculates the DC and IC placements depending on the ASC and MC
     * placements, and sets them in the given object.
     * @param person the person to whom we will update their placements. 
     *
    public calculateDCandIC(person: Person): void {
        const asc = person.getRising().getDegrees();

        if (asc > 180) {
            person.setDC(new Placement(Element.DC, asc - 180))
        } else {
            person.setDC(new Placement(Element.DC, asc + 180));
        }

        const mc = person.getMC().getDegrees();
        if (mc > 180) {
            person.setIC(new Placement(Element.IC, mc - 180))
        } else {
            person.setIC(new Placement(Element.IC, mc + 180))
        }
    }
    */
}
