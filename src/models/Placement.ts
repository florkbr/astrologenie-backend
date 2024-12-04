import type { Element } from './Element';

export class Placement {
	private degrees: number;
	private element: Element;

	constructor(element: Element, degrees: number) {
		this.degrees = degrees;
		this.element = element;
	}

	public getDegrees(): number {
		return this.degrees;
	}

	public setDegrees(degrees: number): void {
		this.degrees = degrees;
	}

	public getElement(): Element {
		return this.element;
	}
}
