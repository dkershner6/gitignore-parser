import * as core from '@actions/core';
import run from '../src/main';

describe('Main', () => {
    const setOutputSpy = jest.spyOn(core, 'setOutput');
    const setFailedSpy = jest.spyOn(core, 'setFailed');

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Should return gitignored with two items, no lines_not_included, and all_lines_included true', () => {
        const inputs = {
            path: './__tests__/__mocks__/normal',
            includes_lines: 'test,test1234'
        };

        run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(['gitignored', 'test,test1234']);
        expect(outputCalls[1]).toEqual(['lines_not_included', '']);
        expect(outputCalls[2]).toEqual(['all_lines_included', 'true']);
        expect(setFailedSpy).not.toHaveBeenCalled();
    });
});
