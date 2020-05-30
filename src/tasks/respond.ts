import { setOutput, error, setFailed } from '@actions/core';

export const DENY_ERROR_MESSAGE_PREFIX =
    'Please add the following to your .gitignore file (replace commas with new lines): ';
export const ACCEPT_ERROR_MESSAGE_PREFIX =
    'Please remove the following from your .gitignore file (might be a pattern, or add to .gitignore with a ! in front): ';

const respond = (
    notDenied: string[],
    notAccepted: string[],
    failOnError: boolean
): void => {
    const notDeniedString = notDenied.join(',');
    setOutput('not_denied', notDeniedString);
    if (notDenied.length > 0) {
        const denyErrorMessage = `${DENY_ERROR_MESSAGE_PREFIX}${notDeniedString}`;
        error(denyErrorMessage);
    }

    const notAcceptedString = notAccepted.join(',');
    setOutput('not_accepted', notAcceptedString);
    if (notAccepted.length > 0) {
        const acceptErrorMessage = `${ACCEPT_ERROR_MESSAGE_PREFIX}${notAcceptedString}`;
        error(acceptErrorMessage);
    }

    const requirementsAreMet =
        notDenied.length === 0 && notAccepted.length === 0;

    finalResponse(requirementsAreMet, failOnError);
};

const finalResponse = (
    requirementsAreMet: boolean,
    failOnError: boolean
): void => {
    if (requirementsAreMet) {
        setOutput('requirements_met', 'true');
    } else {
        setOutput('requirements_met', 'false');
        if (failOnError) {
            setFailed(
                'A .gitignore error occurred, see above error logging for details.'
            );
        }
    }
};

export default respond;
