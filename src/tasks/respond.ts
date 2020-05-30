import * as core from '@actions/core';

const respond = (linesNotIncluded: string[], failIfNotFound: boolean): void => {
    const linesNotIncludedString = linesNotIncluded.join(',');
    const errorMessage = `Lines that were not included: ${linesNotIncludedString}`;

    core.setOutput('lines_not_included', linesNotIncludedString);

    if (linesNotIncluded.length === 0) {
        core.setOutput('all_lines_included', 'true');
    } else {
        core.setOutput('all_lines_included', 'false');
        core.error(errorMessage);
    }

    if (failIfNotFound && linesNotIncluded.length > 0) {
        core.setFailed(errorMessage);
    }
};

export default respond;
