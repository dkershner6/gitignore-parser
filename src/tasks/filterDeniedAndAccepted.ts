import { IGitIgnore } from './parseGitIgnore';

export interface IDeniedAndAccepted {
    notDenied: string[];
    notAccepted: string[];
}

const filterDeniedAndAccepted = (
    mustDeny: string[],
    mustAccept: string[],
    gitIgnore: IGitIgnore
): IDeniedAndAccepted => {
    const notDenied = mustDeny.filter(
        (fileName) => fileName !== '' && gitIgnore.accepts(fileName)
    );

    const notAccepted = mustAccept.filter(
        (fileName) => fileName !== '' && gitIgnore.denies(fileName)
    );

    return { notDenied, notAccepted };
};

export default filterDeniedAndAccepted;
