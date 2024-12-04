import type { Person } from '../models/Person';
import type { MatrixResult } from '../models/MatrixResult';
import { PeopleComparator } from './PeopleComparator';

interface TeamBuilderOptions {
	numberOfTeams: number | undefined;
	maxCountPerTeam: number | undefined;
	splitRemaining: boolean;
	iterations: number;
}

const defaultTeamBuilderOptions: Readonly<TeamBuilderOptions> = {
	numberOfTeams: undefined,
	maxCountPerTeam: undefined,
	splitRemaining: true,
	iterations: 100
};

interface Context extends Required<TeamBuilderOptions> {
	persons: Array<Person>;
	matrixScore: Array<Array<number>>;
	preferBestTeam: boolean;
}

export interface Team {
	persons: Array<Person>;
	score: number;
}

// Takes all the persons with the full matrix
/**
 * Builds the perfect teams based on the input given.
 * If numberOfTeams is not given, compute a numberOfTeams based on the maxCountPerTeam
 * and the size of the input
 * Either options.numberOfTeams or options.maxCountPerTeam has to be specified
 * @param persons
 * @param partialOptions
 */
export const buildTeams = (
	persons: Array<Person>,
	partialOptions?: Partial<TeamBuilderOptions>
): [Array<Team>, Array<Person>, Array<Array<number>>] => {
	const numberOfPersons = persons.length;

	const options = { ...defaultTeamBuilderOptions, ...partialOptions } as TeamBuilderOptions;

	if (!options.numberOfTeams && !options.maxCountPerTeam) {
		throw new Error('Must specify numberOfTeams or maxCountPerTeam');
	}

	const peopleComparator = new PeopleComparator();

	const matrix = peopleComparator.comparePeople(persons);

	const context: Context = {
		...options,
		numberOfTeams: options.numberOfTeams ?? numberOfPersons / options.maxCountPerTeam!,
		persons: persons,
		preferBestTeam: false,
		matrixScore: computePairScoreMatrix(matrix)
	};

	if (!options.numberOfTeams) {
		options.numberOfTeams = numberOfPersons / options.maxCountPerTeam!;
	}

	let teamCentroids = pickRandomPersons(persons, options.numberOfTeams);
	let bestScore = 0;
	let bestTeams: Array<Array<Person>> = [];
	let bestRemaining: Array<Person> = [];

	console.log('People:', context.persons);
	console.log('Matrix:', matrix);
	console.log('Matrix of scores:', context.matrixScore);

	for (let i = 0; i < options.iterations; i++) {
		console.log('Starting iteration', i);

		// Modifies how the teams are being built - adds some randomness to some iterations
		context.preferBestTeam = Math.random() > 0.5;

		const [teams, remaining] = buildTeamsInternalIteration(persons, teamCentroids, context);

		let score = 0;
		for (const team of teams) {
			score += computeTeamScore(context, ...team);
		}

		console.log('-- got a team with score', score);

		if (score > bestScore) {
			bestScore = score;
			bestTeams = teams;
			bestRemaining = remaining;
		}

		// Pick new centroids
		// This could be done in several ways, like choosing the  ones that score the most with each other within a team
		// but lets go with the easy step of getting new randoms
		teamCentroids = pickRandomPersons(persons, options.numberOfTeams);
	}

	return [
		bestTeams
			.map((t) => ({ persons: t, score: computeTeamScore(context, ...t) }))
			.sort((t1, t2) => t2.score - t1.score),
		bestRemaining,
		context.matrixScore
	];
};

const buildTeamsInternalIteration = (
	persons: Array<Person>,
	centroids: Array<Person>,
	context: Context
): [Array<Array<Person>>, Array<Person>] => {
	const teams = centroids.map((p) => [p]);
	const remaining = persons.filter((p) => !centroids.includes(p));

	for (;;) {
		// Pick a team
		const team = getNextTeam(teams, context);

		// Lets add one member to this team - the best match
		const bestMatch = findBestMatch(team, remaining, context);
		remaining.splice(
			remaining.findIndex((r) => r === bestMatch),
			1
		);
		team.push(bestMatch);

		if (areTeamsComplete(teams, remaining, context)) {
			return [teams, remaining];
		}
	}
};

const pickRandomPersons = (persons: Array<Person>, count: number): Array<Person> => {
	const randomPersons: Array<Person> = [];
	const copyOfPersonsArray = [...persons];

	while (randomPersons.length < count && copyOfPersonsArray.length > 0) {
		randomPersons.push(
			...copyOfPersonsArray.splice(Math.floor(Math.random() * copyOfPersonsArray.length), 1)
		);
	}

	return randomPersons;
};

const areTeamsComplete = (
	teams: Array<Array<Person>>,
	remaining: Array<Person>,
	context: Context
) => {
	if (remaining.length === 0) {
		return true;
	}

	const teamSizes = teams.map((t) => t.length);
	const minTeamSize = Math.min(...teamSizes);

	if (context.maxCountPerTeam === minTeamSize) {
		return !context.splitRemaining;
	}

	return false;
};

const getNextTeam = (teams: Array<Array<Person>>, context: Context): Array<Person> => {
	const teamSizes = teams.map((t) => t.length);
	const minTeamSize = Math.min(...teamSizes);
	const maxTeamSize = Math.max(...teamSizes);

	if (context.preferBestTeam && maxTeamSize < context.maxCountPerTeam!) {
		return teams.find((t) => t.length === maxTeamSize)!;
	}

	return teams.find((t) => t.length === minTeamSize)!;
};

const findBestMatch = (team: Array<Person>, remaining: Array<Person>, context: Context): Person => {
	let score = Number.MIN_SAFE_INTEGER;
	let bestMatch = remaining[0];
	for (const candidate of remaining) {
		const teamWithCandidateScore = computeTeamScore(context, ...team, candidate);
		if (teamWithCandidateScore > score) {
			score = teamWithCandidateScore;
			bestMatch = candidate;
		}
	}

	return bestMatch;
};

const computeTeamScore = (context: Context, ...team: Array<Person>): number => {
	let score = 0;
	let counts = 0;
	for (let i = 0; i < team.length; i++) {
		for (let j = i + 1; j < team.length; j++) {
			score += computePairScore(context, team[i], team[j]);
			counts++;
		}
	}

	return counts === 0 ? 0 : score / counts;
};

export const computePairScore = (context: Context, a: Person, b: Person) => {
	const aIndex = getIndexOf(a, context);
	const bIndex = getIndexOf(b, context);

	if (aIndex === bIndex) {
		throw new Error('Trying to get the score of the same person (same index found)');
	}

	const i = aIndex < bIndex ? bIndex : aIndex;
	const j = aIndex < bIndex ? aIndex : bIndex;

	return context.matrixScore[i][j];
};

const getIndexOf = (person: Person, context: Context) => {
	return context.persons.indexOf(person);
};

const computeMatrixResultScore = (matrixResult: MatrixResult) => {
	let score = 0;

	for (const houseOverlay of matrixResult.getHouseOverlays()) {
		score += 20 * houseOverlay.getCalculatedStat();
	}

	for (const positiveAspect of matrixResult.getPositiveAspects().values()) {
		// scale the aspect to use similar order of magnitude.
		score += positiveAspect;
	}

	for (const negativeAspect of matrixResult.getNegativeAspects().values()) {
		// scale the aspect to use similar order of magnitude.
		score -= negativeAspect;
	}

	return score;
};

const computePairScoreMatrix = (
	matrixResults: Array<Array<MatrixResult>>
): Array<Array<number>> => {
	return matrixResults.map((m) => m.map(computeMatrixResultScore));
};
