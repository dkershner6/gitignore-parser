import { Node20GitHubActionTypescriptProject } from "dkershner6-projen-github-actions";
import { RunsUsing } from "projen-github-action-typescript";

const MAJOR_VERSION = 2;

const project = new Node20GitHubActionTypescriptProject({
    majorVersion: MAJOR_VERSION,
    defaultReleaseBranch: "main",

    devDeps: [
        "dkershner6-projen-github-actions",
        "projen-github-action-typescript",
    ],
    name: "gitignore-parser",
    description: "GitHub Action to parse a .gitignore file for information",

    actionMetadata: {
        name: "GitIgnore Parser",
        description: "GitHub Action to parse a .gitignore file for information",
        inputs: {
            path: {
                description:
                    "The location of the .gitignore file from the repo root, with no filename.",
                default: "./",
                required: false,
            },
            must_deny: {
                description:
                    "Comma-delimited string of files and paths the gitignore must deny being committed",
                default: "",
                required: false,
            },
            must_accept: {
                description:
                    "Comma-delimited string of files and paths the gitignore must accept being committed",
                default: "",
                required: false,
            },
            fail_on_error: {
                description:
                    "true/false to indicate whether the workflow should fail if a string in must_deny is not found",
                default: "true",
                required: false,
            },
        },
        outputs: {
            requirements_met: {
                description:
                    "Returns a boolean string ('true'/'false') representing whether all of the lines in must_deny were indeed denied, and all must_accept were accepted",
            },
            not_denied: {
                description:
                    "A Comma-delimited string containing all of the lines from must_deny that were not denied",
            },
            not_accepted: {
                description:
                    "A Comma-delimited string containing all of the lines from must_accept that were not accepted",
            },
        },
        runs: {
            using: RunsUsing.NODE_20,
            main: "dist/index.js",
        },
        branding: {
            icon: "cloud-off",
            color: "orange",
        },
    },

    deps: ["ignore"],

    autoApproveOptions: {
        allowedUsernames: ["dkershner6"],
    },

    sampleCode: false,
    docgen: true,
});

project.synth();
