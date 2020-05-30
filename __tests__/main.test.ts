// eslint-disable-next-line import/no-namespace
import * as core from '@actions/core';
import run from '../src/main';
import {
    DENY_ERROR_MESSAGE_PREFIX,
    ACCEPT_ERROR_MESSAGE_PREFIX,
} from '../src/tasks/respond';

describe('Main', () => {
    const setOutputSpy = jest.spyOn(core, 'setOutput');
    const errorSpy = jest.spyOn(core, 'error');
    const setFailedSpy = jest.spyOn(core, 'setFailed');

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Should return requirements met when all must_deny are denied', () => {
        const inputs = {
            path: './__mocks__/normal',
            must_deny: 'test,test1234',
        };

        run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(['not_denied', '']);
        expect(outputCalls[1]).toEqual(['not_accepted', '']);
        expect(outputCalls[2]).toEqual(['requirements_met', 'true']);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(setFailedSpy).not.toHaveBeenCalled();
    });

    it('Should return requirements met when all must_accept are accepted', () => {
        const inputs = {
            path: './__mocks__/normal',
            must_accept: 'aBurritoToEat.ts',
        };

        run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(['not_denied', '']);
        expect(outputCalls[1]).toEqual(['not_accepted', '']);
        expect(outputCalls[2]).toEqual(['requirements_met', 'true']);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(setFailedSpy).not.toHaveBeenCalled();
    });

    it('Should return requirements met when all must_accept and must_denied are correctly handled', () => {
        const inputs = {
            path: './__mocks__/normal',
            must_deny: 'test,test1234',
            must_accept: 'aBurritoToEat.ts',
        };

        run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(['not_denied', '']);
        expect(outputCalls[1]).toEqual(['not_accepted', '']);
        expect(outputCalls[2]).toEqual(['requirements_met', 'true']);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(setFailedSpy).not.toHaveBeenCalled();
    });

    it('Should return requirements not met and fail with a must_deny on a blank .gitignore', () => {
        const inputs = {
            path: './__mocks__/blank',
            must_deny: 'test,test1234',
        };

        run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(['not_denied', inputs.must_deny]);
        expect(outputCalls[1]).toEqual(['not_accepted', '']);
        expect(outputCalls[2]).toEqual(['requirements_met', 'false']);
        expect(errorSpy).toHaveBeenCalledWith(
            `${DENY_ERROR_MESSAGE_PREFIX}${inputs.must_deny}`
        );
        expect(setFailedSpy).toHaveBeenCalled();
    });

    it('Should return requirements met when there is only must_accept on a blank .gitignore', () => {
        const inputs = {
            path: './__mocks__/blank',
            must_accept: 'aBurritoToEat.ts',
        };

        run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(['not_denied', '']);
        expect(outputCalls[1]).toEqual(['not_accepted', '']);
        expect(outputCalls[2]).toEqual(['requirements_met', 'true']);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(setFailedSpy).not.toHaveBeenCalled();
    });

    it('Should return requirements not met and fail with a must_deny (and must_accept) on a blank .gitignore', () => {
        const inputs = {
            path: './__mocks__/blank',
            must_deny: 'test,test1234',
            must_accept: 'aBurritoToEat.ts',
        };

        run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(['not_denied', inputs.must_deny]);
        expect(outputCalls[1]).toEqual(['not_accepted', '']);
        expect(outputCalls[2]).toEqual(['requirements_met', 'false']);
        expect(errorSpy).toHaveBeenCalledWith(
            `${DENY_ERROR_MESSAGE_PREFIX}${inputs.must_deny}`
        );
        expect(setFailedSpy).toHaveBeenCalled();
    });

    it('Should return requirements met for the .gitignore of this repo, with valid must_deny and must_accept', () => {
        const inputs = {
            path: './',
            must_deny: 'node_modules,.env',
            must_accept: 'aBurritoToEat.ts',
        };

        run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(['not_denied', '']);
        expect(outputCalls[1]).toEqual(['not_accepted', '']);
        expect(outputCalls[2]).toEqual(['requirements_met', 'true']);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(setFailedSpy).not.toHaveBeenCalled();
    });

    it('Should return requirements NOT met for the .gitignore of this repo, with invalid must_deny and must_accept', () => {
        const inputs = {
            path: './',
            must_deny: '',
            must_accept: 'node_modules/a-package-so-great-you-should-commit-it',
        };

        run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(['not_denied', '']);
        expect(outputCalls[1]).toEqual(['not_accepted', inputs.must_accept]);
        expect(outputCalls[2]).toEqual(['requirements_met', 'false']);
        expect(errorSpy).toHaveBeenCalledWith(
            `${ACCEPT_ERROR_MESSAGE_PREFIX}${inputs.must_accept}`
        );
        expect(setFailedSpy).toHaveBeenCalled();
    });
});
