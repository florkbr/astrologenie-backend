import { MatrixResult } from '../models/MatrixResult';
import type { Person } from '../models/Person';
import { AspectCalculator } from './AspectCalculator';
import { HouseCalculator } from './HouseCalculator';

export class PeopleComparator {
	private readonly aspectCalculator = new AspectCalculator();
	private readonly houseCalculator = new HouseCalculator();

	/**
	 * Compares the people and leaves the results in a matrix.
	 * @param people the people to compare among themselves.
	 * @returns a symmetric matrix with the upper half filled with the results
	 * of the comparissons.
	 */
	public comparePeople(people: Array<Person>): MatrixResult[][] {
		const resultsMatrix: MatrixResult[][] = [];

		for (let i = 0; i < people.length; i++) {
			// Initialize the rows for each column.
			resultsMatrix[i] = [];

			for (let j = 0; j < i; j++) {
				// The diagonal of the matrix represents as if we were
				// one person to himself, and that doesn't make sense.
				// Also,the matrix is symetrical, so it doesn't make
				// sense to compare one person to another and back.

				this.aspectCalculator.processPeople(people[i], people[j]);
				this.houseCalculator.processHousesToPlacements(people[i], people[j]);

				resultsMatrix[i][j] = new MatrixResult(
					this.aspectCalculator.getPositiveStats(),
					this.aspectCalculator.getNegativeStats(),
					this.houseCalculator.getHouseOverlays()
				);
			}
		}

		return resultsMatrix;
	}
}
