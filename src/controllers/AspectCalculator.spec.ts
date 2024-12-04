import test from 'ava';
import { Element } from '../models/Element';
import { Person } from '../models/Person';
import { Placement } from '../models/Placement';
import { House, HouseNumber } from '../models/House';

import { AspectCalculator } from './AspectCalculator';
/**
 * Tests that procesing two people yields the expected results.
 */
test('process people', (t) => {
	// Set up the stub elements.

	const person1 = new Person(
		'John Doe',
		new Placement(Element.ARIES, 25), // rising
		new Placement(Element.CANCER, 0), // moon
		new Placement(Element.PISCES, 12), // sun
		new Placement(Element.LIBRA, 2), // mars
		new Placement(Element.LEO, 24), // mercury
		new House(HouseNumber.HOUSE_2, Element.ARIES),
		new House(HouseNumber.HOUSE_3, Element.CANCER),
		new House(HouseNumber.HOUSE_6, Element.PISCES),
		new House(HouseNumber.HOUSE_10, Element.LIBRA),
		new House(HouseNumber.HOUSE_11, Element.LEO),
		// optionals
		new Placement(Element.CAPRICORN, 10), // jupiter
		new Placement(Element.AQUARIUS, 13), // mc
		new Placement(Element.SAGITTARIUS, 10), // neptune
		new Placement(Element.GEMINI, 25), // pluto
		new Placement(Element.TAURUS, 10), // saturn
		new Placement(Element.ARIES, 12), // uranus
		new Placement(Element.CAPRICORN, 10) // venus
	);

	const person2 = new Person(
		'Jane Doe',
		new Placement(Element.ARIES, 1), // rising
		new Placement(Element.CANCER, 11), // moon
		new Placement(Element.PISCES, 5), // sun
		new Placement(Element.LIBRA, 29), // mars
		new Placement(Element.LEO, 8), // mercury
		new House(HouseNumber.HOUSE_2, Element.LEO),
		new House(HouseNumber.HOUSE_3, Element.LIBRA),
		new House(HouseNumber.HOUSE_6, Element.PISCES),
		new House(HouseNumber.HOUSE_10, Element.CANCER),
		new House(HouseNumber.HOUSE_11, Element.ARIES),
		// optionals
		new Placement(Element.CAPRICORN, 5), // jupiter
		new Placement(Element.AQUARIUS, 12), // mc
		new Placement(Element.SAGITTARIUS, 19), // neptune
		new Placement(Element.GEMINI, 24), // pluto
		new Placement(Element.TAURUS, 3), // saturn
		new Placement(Element.ARIES, 11), // uranus
		new Placement(Element.CAPRICORN, 23) // venus
	);

	// Call the function under test.
	const aspectCalculator = new AspectCalculator();
	aspectCalculator.processPeople(person1, person2);

	// Fetch the positive results.
	const positiveStats: Map<Element, number> = aspectCalculator.getPositiveStats();
	const negativeStats: Map<Element, number> = aspectCalculator.getNegativeStats();

	// Prepare the expected positive values. Uncomment in the case that we use all the
	// placements for the calculations.
	/*
    const expectedPositiveResults: Map<Element, number> = new Map<Element, number>([
        [Element.RISING, 35.5],
        [Element.MOON, 48.5],
        [Element.SUN, 32],
        [Element.MARS, 28],
        [Element.MERCURY, 53],
        [Element.NEPTUNE, 61],
        [Element.JUPITER, 48],
        [Element.SATURN, 43.5],
        [Element.VENUS, 16],
        [Element.MC, 57],
        [Element.URANUS, 62],
        [Element.PLUTO, 47.5]
    ]);
    */
	const expectedPositiveResults: Map<Element, number> = new Map<Element, number>([
		[Element.RISING, 35.5],
		[Element.SUN, 12],
		[Element.MOON, 48.5],
		[Element.MARS, 28],
		[Element.MERCURY, 53],
		[Element.PLUTO, 47.5]
	]);

	// Check that the map sizes are correct.
	t.is(
		positiveStats.size,
		expectedPositiveResults.size,
		'the size of the map of the positive stats is not correct'
	);

	// Check that the positive results map contains the expected values.
	for (const [expectedElement, expectedValue] of expectedPositiveResults.entries()) {
		const statNumberResult = positiveStats.get(expectedElement);

		if (statNumberResult === undefined) {
			t.fail(
				`the expected element "${expectedElement}" was not found in the resulting results map`
			);
		}

		t.is(
			statNumberResult,
			expectedValue,
			`the calculated value is different from the expected one for the element "${expectedElement}"`
		);
	}

	// Fetch the negative results.

	// Prepare the expected negative values. Uncomment in the case that we use all the
	// placements for the calculations.
	/*
    const expectedNegativeResults: Map<Element, number> = new Map<Element, number>([
        [Element.RISING, 61],
        [Element.MARS, 56],
        [Element.NEPTUNE, 42.5],
        [Element.JUPITER, 51],
        [Element.SATURN, 45.5],
        [Element.MOON, 76.5],
        [Element.VENUS, 59.5],
        [Element.MC, 31],
        [Element.URANUS, 82.5],
        [Element.SUN, 30],
        [Element.MERCURY, 49],
        [Element.PLUTO, 67.5]
    ]);
    */
	const expectedNegativeResults: Map<Element, number> = new Map<Element, number>([
		[Element.RISING, 61],
		[Element.SUN, 30],
		[Element.MOON, 76.5],
		[Element.MARS, 56],
		[Element.MERCURY, 49]
	]);

	// Check that the map sizes are correct.
	t.is(
		negativeStats.size,
		expectedNegativeResults.size,
		'the size of the map of the negative stats is not correct'
	);

	// Check that the negative results map contains the expected values.
	for (const [expectedElement, expectedValue] of expectedNegativeResults.entries()) {
		const statNumberResult = negativeStats.get(expectedElement);

		if (statNumberResult === undefined) {
			t.fail(
				`the expected element "${expectedElement}" was not found in the resulting results map`
			);
		}

		t.is(
			statNumberResult,
			expectedValue,
			`the calculated value is different from the expected one for the element "${expectedElement}"`
		);
	}
});
