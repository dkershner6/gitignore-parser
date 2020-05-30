import { setOutput, error, setFailed } from '@actions/core';

const respond = (linesNotIncluded: string[], failIfNotFound: boolean): void => {
    const linesNotIncludedString = linesNotIncluded.join(',');
    const errorMessage = `Lines that were not included: ${linesNotIncludedString}`;

    setOutput('lines_not_included', linesNotIncludedString);

    if (linesNotIncluded.length === 0) {
        setOutput('all_included', 'true');
    } else {
        setOutput('all_included', 'false');
        error(errorMessage);
    }

    if (failIfNotFound && linesNotIncluded.length > 0) {
        setFailed(errorMessage);
    }
};

export default respond;
