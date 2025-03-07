import { CoverageSummary } from '../../typings/Coverage';
import { CoverageMap, FileCoverage } from '../../typings/JsonReport';
import { getPercents } from '../getPercents';

export const getSummary = (
    map: CoverageMap,
    totalCounter: (value: FileCoverage) => number,
    coveredCounter: (value: FileCoverage) => number,
    title: string
): CoverageSummary => {
    console.log('getSummary: Object values: ', !!map);

    const values = Object.values(map).map((value) =>
        'statementMap' in value ? value : value.data
    );

    const total = values.reduce(
        (acc, currValue) => acc + totalCounter(currValue),
        0
    );

    const covered = values.reduce(
        (acc, currValue) => acc + coveredCounter(currValue),
        0
    );

    const result = {
        title,
        total,
        covered,
        percentage: getPercents(covered, total),
    };

    console.log('getSummary: finished');

    return result;
};
