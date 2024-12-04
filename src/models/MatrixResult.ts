import type { Element } from './Element';
import type { HouseOverlay } from './HouseOverlay';

export class MatrixResult {
	private positiveAspects: Map<Element, number>;
	private negativeAspects: Map<Element, number>;
	private houseOverlays: Array<HouseOverlay>;

	constructor(
		positiveAspects: Map<Element, number>,
		negativeAspects: Map<Element, number>,
		houseOverlays: Array<HouseOverlay>
	) {
		this.positiveAspects = positiveAspects;
		this.negativeAspects = negativeAspects;
		this.houseOverlays = houseOverlays;
	}

	public getPositiveAspects(): Map<Element, number> {
		return this.positiveAspects;
	}

	public getNegativeAspects(): Map<Element, number> {
		return this.negativeAspects;
	}

	public getHouseOverlays(): Array<HouseOverlay> {
		return this.houseOverlays;
	}
}
