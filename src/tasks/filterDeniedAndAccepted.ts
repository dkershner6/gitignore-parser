import { Ignore } from 'ignore';

export interface IDeniedAndAccepted {
    notDenied: string[];
    notAccepted: string[];
}

const filterDeniedAndAccepted = (
    mustDeny: string[],
    mustAccept: string[],
    gitIgnore: Ignore
): IDeniedAndAccepted => {
    const notDenied = mustDeny.filter(
        (fileName) => fileName !== '' && !gitIgnore.ignores(fileName)
    );

    const notAccepted = mustAccept.filter(
        (fileName) => fileName !== '' && gitIgnore.ignores(fileName)
    );

    return { notDenied, notAccepted };
};

export default filterDeniedAndAccepted;
