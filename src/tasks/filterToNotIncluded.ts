const filterToNotIncluded = (
    includesLines: string[],
    gitIgnoreLines: Set<string>
): string[] => {
    return includesLines.filter((line) => !gitIgnoreLines.has(line));
};

export default filterToNotIncluded;
