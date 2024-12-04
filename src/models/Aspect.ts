/**
 * The allowed orb or range for each aspect.
 */
enum AspectAllowedOrb {
	CONJUNCTION = 10,
	/* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
	OPPOSITION = 10,
	SQUARE = 6,
	/* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
	TRINE = 6,
	SEXTILE = 4,
	MINOR = 2
}

/**
 * The degrees of each aspect.
 */
enum AspectDegree {
	CONJUNCTION = 0,
	OPPOSITION = 180,
	SQUARE = 90,
	TRINE = 120,
	SEXTILE = 60,
	QUINCUNX = 150,
	SESQUI_QUADRATE = 135,
	SEMI_SQUARE = 45,
	SEMI_SEXTILE = 30,
	QUINTILE = 72,
	BI_QUINTILE = 144
}

/**
 * The different names of the aspects.
 */
enum AspectName {
	CONJUNCTION = 'Conjunction',
	OPPOSITION = 'Opposition',
	SQUARE = 'Square',
	TRINE = 'Trine',
	SEXTILE = 'Sextile',
	QUINCUNX = 'Quincunx',
	SESQUI_QUADRATE = 'Sesquiquadrate',
	SEMI_SQUARE = 'Semisquare',
	SEMI_SEXTILE = 'Semisextile',
	QUINTILE = 'Quintile',
	BI_QUINTILE = 'Biquintile'
}

/**
 * Stats for each of the aspects.
 */
enum AspectStat {
	CONJUNCTION = 5.0,
	OPPOSITION = 4.5,
	TRINE = 4,
	/* eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values*/
	SQUARE = 4,
	SEXTILE = 3,
	MINOR = 2
}

export class Aspect {
	// Define the major aspects with their degrees and the corresponding allowed orbs.
	static readonly CONJUNCTION = new Aspect(
		AspectName.CONJUNCTION,
		AspectDegree.CONJUNCTION,
		AspectAllowedOrb.CONJUNCTION,
		AspectStat.CONJUNCTION
	);
	static readonly OPPOSITION = new Aspect(
		AspectName.OPPOSITION,
		AspectDegree.OPPOSITION,
		AspectAllowedOrb.OPPOSITION,
		AspectStat.OPPOSITION
	);
	static readonly SQUARE = new Aspect(
		AspectName.SQUARE,
		AspectDegree.SQUARE,
		AspectAllowedOrb.SQUARE,
		AspectStat.SQUARE
	);
	static readonly TRINE = new Aspect(
		AspectName.TRINE,
		AspectDegree.TRINE,
		AspectAllowedOrb.TRINE,
		AspectStat.TRINE
	);
	static readonly SEXTILE = new Aspect(
		AspectName.SEXTILE,
		AspectDegree.SEXTILE,
		AspectAllowedOrb.SEXTILE,
		AspectStat.SEXTILE
	);
	static readonly QUINCUNX = new Aspect(
		AspectName.QUINCUNX,
		AspectDegree.QUINCUNX,
		AspectAllowedOrb.MINOR,
		AspectStat.MINOR
	);
	static readonly SESQUI_QUADRATE = new Aspect(
		AspectName.SESQUI_QUADRATE,
		AspectDegree.SESQUI_QUADRATE,
		AspectAllowedOrb.MINOR,
		AspectStat.MINOR
	);
	static readonly SEMI_SQUARE = new Aspect(
		AspectName.SEMI_SQUARE,
		AspectDegree.SEMI_SQUARE,
		AspectAllowedOrb.MINOR,
		AspectStat.MINOR
	);
	static readonly SEMI_SEXTILE = new Aspect(
		AspectName.SEMI_SEXTILE,
		AspectDegree.SEMI_SEXTILE,
		AspectAllowedOrb.MINOR,
		AspectStat.MINOR
	);
	static readonly QUINTILE = new Aspect(
		AspectName.QUINTILE,
		AspectDegree.QUINTILE,
		AspectAllowedOrb.MINOR,
		AspectStat.MINOR
	);
	static readonly BI_QUINTILE = new Aspect(
		AspectName.BI_QUINTILE,
		AspectDegree.BI_QUINTILE,
		AspectAllowedOrb.MINOR,
		AspectStat.MINOR
	);

	// Define an array with all the aspects for an easier use.
	static readonly ALL_ASPECTS = [
		this.CONJUNCTION,
		this.OPPOSITION,
		this.SQUARE,
		this.TRINE,
		this.SEXTILE,
		this.QUINCUNX,
		this.SESQUI_QUADRATE,
		this.SEMI_SQUARE,
		this.SEMI_SEXTILE,
		this.QUINTILE,
		this.BI_QUINTILE
	];

	private readonly allowedOrb: number;
	private readonly degree: number;
	private readonly name: string;
	private readonly stat: number;

	private constructor(
		name: AspectName,
		degree: AspectDegree,
		allowedOrb: AspectAllowedOrb,
		stat: AspectStat
	) {
		this.allowedOrb = allowedOrb;
		this.degree = degree;
		this.name = name;
		this.stat = stat;
	}

	public getDegree(): number {
		return this.degree;
	}

	public getAllowedOrb(): number {
		return this.allowedOrb;
	}

	public getName(): string {
		return this.name;
	}

	public getStat(): number {
		return this.stat;
	}
}
