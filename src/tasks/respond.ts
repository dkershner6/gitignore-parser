import { setOutput, error, setFailed } from '@actions/core';

export const ERROR_MESSAGE_PREFIX =
    'Please add the following to your .gitignore file (replace commas with new lines): ';

const respond = (linesNotIncluded: string[], failIfNotFound: boolean): void => {
    const linesNotIncludedString = linesNotIncluded.join(',');
    const errorMessage = `${ERROR_MESSAGE_PREFIX}${linesNotIncludedString}`;

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
