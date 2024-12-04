import test from 'ava';
import { Element } from '../models/Element';
import { House, HouseNumber } from '../models/House';
import { Person } from '../models/Person';
import { Placement } from '../models/Placement';
import { PeopleComparator } from './PeopleComparator';

/**
 * Simply runs to make sure that the logic does not explode.
 */
test('build matrix people', (t) => {
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

	const person3 = new Person(
		'Jason Doe',
		new Placement(Element.ARIES, 24), // rising
		new Placement(Element.CANCER, 14), // moon
		new Placement(Element.PISCES, 4), // sun
		new Placement(Element.LIBRA, 12), // mars
		new Placement(Element.LEO, 5), // mercury
		new House(HouseNumber.HOUSE_2, Element.LEO),
		new House(HouseNumber.HOUSE_3, Element.LIBRA),
		new House(HouseNumber.HOUSE_6, Element.PISCES),
		new House(HouseNumber.HOUSE_10, Element.CANCER),
		new House(HouseNumber.HOUSE_11, Element.ARIES),
		// optionals
		new Placement(Element.CAPRICORN, 4), // jupiter
		new Placement(Element.AQUARIUS, 12), // mc
		new Placement(Element.SAGITTARIUS, 2), // neptune
		new Placement(Element.GEMINI, 1), // pluto
		new Placement(Element.TAURUS, 5), // saturn
		new Placement(Element.ARIES, 1), // uranus
		new Placement(Element.CAPRICORN, 4) // venus
	);

	const peopleComparator = new PeopleComparator();
	peopleComparator.comparePeople([person1, person2, person3]);

	t.is(true, true);
});
