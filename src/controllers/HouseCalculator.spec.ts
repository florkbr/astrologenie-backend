import test from 'ava';

import { Person } from '../models/Person';
import { Placement } from '../models/Placement';
import { Element } from '../models/Element';
import { House, HouseNumber, HouseStat } from '../models/House';
import { HouseCalculator } from './HouseCalculator';
import { HouseOverlay } from '../models/HouseOverlay';

/**
 * Tests that the House Calculator yields the results we would expect after doing
 * the calculations.
 */
test('house calculator yields the expected results', (t) => {
	// Prepare the first and second person's stubs. Since this is a test, we
	// will simulate that they've got all matching overlays.
	const firstPerson: Person = new Person(
		'John Doe',
		new Placement(Element.VIRGO, 25), // rising
		new Placement(Element.GEMINI, 0), // moon
		new Placement(Element.AQUARIUS, 12), // sun
		new Placement(Element.SCORPIO, 2), // mars
		new Placement(Element.SAGITTARIUS, 24), // mercury
		new House(HouseNumber.HOUSE_2, Element.CAPRICORN), // 2nd house.
		new House(HouseNumber.HOUSE_3, Element.LEO), // 3rd house.
		new House(HouseNumber.HOUSE_6, Element.ARIES), // 6th house.
		new House(HouseNumber.HOUSE_10, Element.TAURUS), // 10th house.
		new House(HouseNumber.HOUSE_11, Element.LIBRA) // 11th house.
	);

	const secondPerson = new Person(
		'Jane Doe',
		new Placement(Element.CAPRICORN, 1), // rising
		new Placement(Element.LEO, 11), // moon
		new Placement(Element.ARIES, 5), // sun
		new Placement(Element.TAURUS, 29), // mars
		new Placement(Element.LIBRA, 8), // mercury
		new House(HouseNumber.HOUSE_2, Element.VIRGO), // 2nd house.
		new House(HouseNumber.HOUSE_3, Element.GEMINI), // 3rd house.
		new House(HouseNumber.HOUSE_6, Element.AQUARIUS), // 6th house.
		new House(HouseNumber.HOUSE_10, Element.SCORPIO), // 10th house.
		new House(HouseNumber.HOUSE_11, Element.SAGITTARIUS) // 11th house.
	);

	const expectedHouseOverlays = new Array<HouseOverlay>();

	// First person's overlays.
	expectedHouseOverlays.push(
		new HouseOverlay(
			firstPerson,
			secondPerson,
			firstPerson.getHouse2(),
			Element.RISING,
			secondPerson.getRising(),
			HouseStat.HOUSE_2 * 1
		)
	);
	expectedHouseOverlays.push(
		new HouseOverlay(
			firstPerson,
			secondPerson,
			firstPerson.getHouse3(),
			Element.MOON,
			secondPerson.getMoon(),
			HouseStat.HOUSE_3 * 1
		)
	);
	expectedHouseOverlays.push(
		new HouseOverlay(
			firstPerson,
			secondPerson,
			firstPerson.getHouse6(),
			Element.SUN,
			secondPerson.getSun(),
			HouseStat.HOUSE_6 * 1
		)
	);
	expectedHouseOverlays.push(
		new HouseOverlay(
			firstPerson,
			secondPerson,
			firstPerson.getHouse10(),
			Element.MARS,
			secondPerson.getMars(),
			HouseStat.HOUSE_10 * 5
		)
	);
	expectedHouseOverlays.push(
		new HouseOverlay(
			firstPerson,
			secondPerson,
			firstPerson.getHouse11(),
			Element.MERCURY,
			secondPerson.getMercury(),
			HouseStat.HOUSE_11 * 4
		)
	);

	// Second person's overlays
	expectedHouseOverlays.push(
		new HouseOverlay(
			secondPerson,
			firstPerson,
			secondPerson.getHouse2(),
			Element.RISING,
			firstPerson.getRising(),
			HouseStat.HOUSE_2 * 1
		)
	);
	expectedHouseOverlays.push(
		new HouseOverlay(
			secondPerson,
			firstPerson,
			secondPerson.getHouse3(),
			Element.MOON,
			firstPerson.getMoon(),
			HouseStat.HOUSE_3 * 1
		)
	);
	expectedHouseOverlays.push(
		new HouseOverlay(
			secondPerson,
			firstPerson,
			secondPerson.getHouse6(),
			Element.SUN,
			firstPerson.getSun(),
			HouseStat.HOUSE_6 * 1
		)
	);
	expectedHouseOverlays.push(
		new HouseOverlay(
			secondPerson,
			firstPerson,
			secondPerson.getHouse10(),
			Element.MARS,
			firstPerson.getMars(),
			HouseStat.HOUSE_10 * 5
		)
	);
	expectedHouseOverlays.push(
		new HouseOverlay(
			secondPerson,
			firstPerson,
			secondPerson.getHouse11(),
			Element.MERCURY,
			firstPerson.getMercury(),
			HouseStat.HOUSE_11 * 4
		)
	);

	// Call the function under test.
	const houseCalculator = new HouseCalculator();
	houseCalculator.processHousesToPlacements(firstPerson, secondPerson);

	// Assert that we have gotten the expected overlays.
	const houseOverlays: Array<HouseOverlay> = houseCalculator.getHouseOverlays();

	t.is(
		houseOverlays.length,
		expectedHouseOverlays.length,
		'unexpected number of result elements received from the house calculator'
	);

	for (const expectedHouseOverlay of expectedHouseOverlays) {
		let found = false;
		for (const houseOverlay of houseOverlays) {
			const expectedHousePerson = expectedHouseOverlay.getPersonHouse();
			const resultHousePerson = houseOverlay.getPersonHouse();

			if (expectedHousePerson.getName() !== resultHousePerson.getName()) {
				continue;
			}

			const expectedPlacementPerson = expectedHouseOverlay.getPersonPlacement();
			const resultPlacementPerson = expectedHouseOverlay.getPersonPlacement();

			if (expectedPlacementPerson.getName() !== resultPlacementPerson.getName()) {
				continue;
			}

			const expectedHouse = expectedHouseOverlay.getHouse();
			const resultHouse = houseOverlay.getHouse();

			if (
				expectedHouse.getElement() !== resultHouse.getElement() ||
				expectedHouse.getNumber() !== resultHouse.getNumber() ||
				expectedHouse.getStat() !== expectedHouse.getStat()
			) {
				continue;
			}

			const expectedElement = expectedHouseOverlay.getElement();
			const resultElement = houseOverlay.getElement();
			if (expectedElement !== resultElement) {
				continue;
			}

			const expectedPlacement = expectedHouseOverlay.getPlacement();
			const resultPlacement = houseOverlay.getPlacement();

			if (
				expectedPlacement.getElement() !== resultPlacement.getElement() ||
				expectedPlacement.getDegrees() !== resultPlacement.getDegrees()
			) {
				continue;
			}

			const expectedStat = expectedHouseOverlay.getCalculatedStat();
			const resultStat = houseOverlay.getCalculatedStat();

			if (expectedStat !== resultStat) {
				continue;
			}

			found = true;
			break;
		}

		if (!found) {
			console.log(expectedHouseOverlay);
			t.fail(
				`expected house overlay was not found in the resulting house overlays from the house calculator`
			);
		}
	}

	t.is(true, true);
});
