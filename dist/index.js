module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(198);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 24:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(__webpack_require__(470));
const respond = (linesNotIncluded, failIfNotFound) => {
    const linesNotIncludedString = linesNotIncluded.join(',');
    const errorMessage = `Lines that were not included: ${linesNotIncludedString}`;
    core.setOutput('lines_not_included', linesNotIncludedString);
    if (linesNotIncluded.length === 0) {
        core.setOutput('all_lines_included', 'true');
    }
    else {
        core.setOutput('all_lines_included', 'false');
        core.error(errorMessage);
    }
    if (failIfNotFound && linesNotIncluded.length > 0) {
        core.setFailed(errorMessage);
    }
};
exports.default = respond;


/***/ }),

/***/ 87:
/***/ (function(module) {

module.exports = require("os");

/***/ }),

/***/ 156:
/***/ (function(__unusedmodule, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const filterToNotIncluded = (includesLines, gitIgnoreLines) => {
    return includesLines.filter(line => !gitIgnoreLines.has(line));
};
exports.default = filterToNotIncluded;


/***/ }),

/***/ 198:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(__webpack_require__(470));
const gatherAllInputs_1 = __importDefault(__webpack_require__(267));
const parseGitIgnore_1 = __importDefault(__webpack_require__(935));
const filterToNotIncluded_1 = __importDefault(__webpack_require__(156));
const respond_1 = __importDefault(__webpack_require__(24));
function run(inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { path, includesLines, failIfNotFound } = gatherAllInputs_1.default(inputs);
            const gitIgnoreLines = parseGitIgnore_1.default(path);
            const linesNotIncluded = filterToNotIncluded_1.default(includesLines, gitIgnoreLines);
            respond_1.default(linesNotIncluded, failIfNotFound);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
exports.default = run;
run();


/***/ }),

/***/ 267:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(__webpack_require__(470));
const gatherAllInputs = (inputs) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const pathInput = (_b = (_a = inputs) === null || _a === void 0 ? void 0 : _a.path, (_b !== null && _b !== void 0 ? _b : core.getInput('path')));
    core.debug(`Input - path: ${pathInput}`);
    const includesLinesInput = (_d = (_c = inputs) === null || _c === void 0 ? void 0 : _c.includes_lines, (_d !== null && _d !== void 0 ? _d : core.getInput('includes_lines')));
    core.debug(`Input - includes_lines: ${includesLinesInput}`);
    const failIfNotFoundInput = (_f = (_e = inputs) === null || _e === void 0 ? void 0 : _e.fail_if_not_found, (_f !== null && _f !== void 0 ? _f : core.getInput('fail_if_not_found')));
    core.debug(`Input - fail_if_not_found: ${failIfNotFoundInput}`);
    return {
        path: (pathInput !== null && pathInput !== void 0 ? pathInput : '/'),
        includesLines: (_h = (_g = includesLinesInput) === null || _g === void 0 ? void 0 : _g.split(','), (_h !== null && _h !== void 0 ? _h : [])),
        failIfNotFound: (_j = Boolean(failIfNotFoundInput), (_j !== null && _j !== void 0 ? _j : true))
    };
};
exports.default = gatherAllInputs;


/***/ }),

/***/ 431:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const os = __webpack_require__(87);
/**
 * Commands
 *
 * Command Format:
 *   ##[name key=value;key=value]message
 *
 * Examples:
 *   ##[warning]This is the user warning message
 *   ##[set-secret name=mypassword]definitelyNotAPassword!
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        // safely append the val - avoid blowing up when attempting to
                        // call .replace() if message is not a string for some reason
                        cmdStr += `${key}=${escape(`${val || ''}`)},`;
                    }
                }
            }
        }
        cmdStr += CMD_STRING;
        // safely append the message - avoid blowing up when attempting to
        // call .replace() if message is not a string for some reason
        const message = `${this.message || ''}`;
        cmdStr += escapeData(message);
        return cmdStr;
    }
}
function escapeData(s) {
    return s.replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}
function escape(s) {
    return s
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/]/g, '%5D')
        .replace(/;/g, '%3B');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 464:
/***/ (function(module) {

"use strict";
/*!
 * parse-gitignore <https://github.com/jonschlinkert/parse-gitignore>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */



const gitignore = input => {
  return input.toString()
    .split(/\r?\n/)
    .filter(l => l.trim() !== '' && l.charAt(0) !== '#');
};

gitignore.parse = (input, fn = line => line) => {
  let lines = input.toString().split(/\r?\n/);
  let state = { patterns: [], sections: [] };
  let section = { name: 'default', patterns: [] };

  for (let line of lines) {
    if (line.charAt(0) === '#') {
      section = { name: line.slice(1).trim(), patterns: []};
      state.sections.push(section);
      continue;
    }

    if (line.trim() !== '') {
      let pattern = fn(line, section, state);
      section.patterns.push(pattern);
      state.patterns.push(pattern);
    }
  }
  return state;
};

gitignore.format = (section) => {
  return `# ${section.name}\n${section.patterns.join('\n')}\n\n`;
};

gitignore.stringify = (sections, fn = gitignore.format) => {
  let result = '';
  for (let section of [].concat(sections)) result += fn(section);
  return result.trim();
};

/**
 * Expose `gitignore`
 */

module.exports = gitignore;


/***/ }),

/***/ 470:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(431);
const os = __webpack_require__(87);
const path = __webpack_require__(622);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable
 */
function exportVariable(name, val) {
    process.env[name] = val;
    command_1.issueCommand('set-env', { name }, val);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    command_1.issueCommand('add-path', {}, inputPath);
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store
 */
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message
 */
function error(message) {
    command_1.issue('error', message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message
 */
function warning(message) {
    command_1.issue('warning', message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store
 */
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 935:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(__webpack_require__(470));
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore - No Types
const parse_gitignore_1 = __importDefault(__webpack_require__(464));
const fs_1 = __importDefault(__webpack_require__(747));
const path_1 = __webpack_require__(622);
const parseGitIgnore = (path) => {
    const gitIgnoreLines = parse_gitignore_1.default(fs_1.default.readFileSync(path_1.join(path, '.gitignore')));
    const gitIgnoreLinesAsString = gitIgnoreLines.join(',');
    core.debug(gitIgnoreLinesAsString);
    core.setOutput('gitignored', gitIgnoreLinesAsString);
    return new Set(gitIgnoreLines);
};
exports.default = parseGitIgnore;


/***/ })

/******/ });