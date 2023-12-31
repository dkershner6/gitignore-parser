/* eslint-disable sonarjs/no-duplicate-string */
// eslint-disable-next-line import/no-namespace
import * as core from "@actions/core";
import { run } from ".";
import {
    DENY_ERROR_MESSAGE_PREFIX,
    ACCEPT_ERROR_MESSAGE_PREFIX,
} from "./tasks/respond";

describe("Main", () => {
    const setOutputSpy = jest.spyOn(core, "setOutput");
    const errorSpy = jest.spyOn(core, "error");
    const setFailedSpy = jest.spyOn(core, "setFailed");

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("Should return requirements met when all must_deny are denied", async () => {
        const inputs = {
            path: "./gitignoreFixtures/normal",
            must_deny: "test,test1234",
        };

        await run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(["not_denied", ""]);
        expect(outputCalls[1]).toEqual(["not_accepted", ""]);
        expect(outputCalls[2]).toEqual(["requirements_met", "true"]);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(setFailedSpy).not.toHaveBeenCalled();
    });

    it("Should return requirements met when all must_accept are accepted", async () => {
        const inputs = {
            path: "./gitignoreFixtures/normal",
            must_accept: "aBurritoToEat.ts",
        };

        await run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(["not_denied", ""]);
        expect(outputCalls[1]).toEqual(["not_accepted", ""]);
        expect(outputCalls[2]).toEqual(["requirements_met", "true"]);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(setFailedSpy).not.toHaveBeenCalled();
    });

    it("Should return requirements met when all must_accept and must_denied are correctly handled", async () => {
        const inputs = {
            path: "./gitignoreFixtures/normal",
            must_deny: "test,test1234",
            must_accept: "aBurritoToEat.ts",
        };

        await run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(["not_denied", ""]);
        expect(outputCalls[1]).toEqual(["not_accepted", ""]);
        expect(outputCalls[2]).toEqual(["requirements_met", "true"]);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(setFailedSpy).not.toHaveBeenCalled();
    });

    it("Should return requirements not met and fail with a must_deny on a blank .gitignore", async () => {
        const inputs = {
            path: "./gitignoreFixtures/blank",
            must_deny: "test,test1234",
        };

        await run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(["not_denied", inputs.must_deny]);
        expect(outputCalls[1]).toEqual(["not_accepted", ""]);
        expect(outputCalls[2]).toEqual(["requirements_met", "false"]);
        expect(errorSpy).toHaveBeenCalledWith(
            `${DENY_ERROR_MESSAGE_PREFIX}${inputs.must_deny}`,
        );
        expect(setFailedSpy).toHaveBeenCalled();
    });

    it("Should return requirements met when there is only must_accept on a blank .gitignore", async () => {
        const inputs = {
            path: "./gitignoreFixtures/blank",
            must_accept: "aBurritoToEat.ts",
        };

        await run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(["not_denied", ""]);
        expect(outputCalls[1]).toEqual(["not_accepted", ""]);
        expect(outputCalls[2]).toEqual(["requirements_met", "true"]);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(setFailedSpy).not.toHaveBeenCalled();
    });

    it("Should return requirements not met and fail with a must_deny (and must_accept) on a blank .gitignore", async () => {
        const inputs = {
            path: "./gitignoreFixtures/blank",
            must_deny: "test,test1234",
            must_accept: "aBurritoToEat.ts",
        };

        await run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(["not_denied", inputs.must_deny]);
        expect(outputCalls[1]).toEqual(["not_accepted", ""]);
        expect(outputCalls[2]).toEqual(["requirements_met", "false"]);
        expect(errorSpy).toHaveBeenCalledWith(
            `${DENY_ERROR_MESSAGE_PREFIX}${inputs.must_deny}`,
        );
        expect(setFailedSpy).toHaveBeenCalled();
    });

    it("Should return requirements NOT met for the .gitignore of this repo, with invalid must_deny and must_accept", async () => {
        const inputs = {
            path: "./",
            must_deny: "",
            must_accept: "node_modules/a-package-so-great-you-should-commit-it",
        };

        await run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(["not_denied", ""]);
        expect(outputCalls[1]).toEqual(["not_accepted", inputs.must_accept]);
        expect(outputCalls[2]).toEqual(["requirements_met", "false"]);
        expect(errorSpy).toHaveBeenCalledWith(
            `${ACCEPT_ERROR_MESSAGE_PREFIX}${inputs.must_accept}`,
        );
        expect(setFailedSpy).toHaveBeenCalled();
    });

    it("Should return requirements NOT met for the .gitignore of this repo, with invalid must_deny and must_accept, but not fail when fail_on_error set to false", async () => {
        const inputs = {
            path: "./",
            must_deny: "",
            must_accept: "node_modules/a-package-so-great-you-should-commit-it",
            fail_on_error: "false",
        };

        await run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(["not_denied", ""]);
        expect(outputCalls[1]).toEqual(["not_accepted", inputs.must_accept]);
        expect(outputCalls[2]).toEqual(["requirements_met", "false"]);
        expect(errorSpy).toHaveBeenCalledWith(
            `${ACCEPT_ERROR_MESSAGE_PREFIX}${inputs.must_accept}`,
        );
        expect(setFailedSpy).not.toHaveBeenCalled();
    });

    it("Should handle strings ending in * correctly (should deny a file without the *)", async () => {
        const inputs = {
            path: "./gitignoreFixtures/normal",
            must_deny: ".env",
        };

        await run(inputs);

        const outputCalls = setOutputSpy.mock.calls;

        expect(outputCalls[0]).toEqual(["not_denied", ""]);
        expect(outputCalls[1]).toEqual(["not_accepted", ""]);
        expect(outputCalls[2]).toEqual(["requirements_met", "true"]);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(setFailedSpy).not.toHaveBeenCalled();
    });
});
