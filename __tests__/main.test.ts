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
            path: './__mocks__/normal',
            includes_lines: 'test,test1234'
        };

        run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(['gitignored', 'test,test1234']);
        expect(outputCalls[1]).toEqual(['lines_not_included', '']);
        expect(outputCalls[2]).toEqual(['all_lines_included', 'true']);
        expect(setFailedSpy).not.toHaveBeenCalled();
    });

    it('Should return blank gitignored, 2 lines_not_included, and all_lines_included false', () => {
        const inputs = {
            path: './__mocks__/blank',
            includes_lines: 'test,test1234'
        };

        run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(['gitignored', '']);
        expect(outputCalls[1]).toEqual(['lines_not_included', 'test,test1234']);
        expect(outputCalls[2]).toEqual(['all_lines_included', 'false']);
        expect(setFailedSpy).toHaveBeenCalled();
    });

    it('Should return blank gitignored, 2 lines_not_included, and all_lines_included false, but not fail', () => {
        const inputs = {
            path: './__mocks__/blank',
            includes_lines: 'test,test1234',
            fail_if_not_found: 'false'
        };

        run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(['gitignored', '']);
        expect(outputCalls[1]).toEqual(['lines_not_included', 'test,test1234']);
        expect(outputCalls[2]).toEqual(['all_lines_included', 'false']);
        expect(setFailedSpy).not.toHaveBeenCalled();
    });

    it('Should error if the gitignore doesnt exist', () => {
        const inputs = {
            path: './__mocks__/NOT-HERE',
            includes_lines: 'test,test1234',
            fail_if_not_found: 'false'
        };

        run(inputs);

        expect(setFailedSpy).toHaveBeenCalledWith(
            "ENOENT: no such file or directory, open '__mocks__/NOT-HERE/.gitignore'"
        );
    });
});
