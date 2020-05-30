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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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

Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCEPT_ERROR_MESSAGE_PREFIX = exports.DENY_ERROR_MESSAGE_PREFIX = void 0;
const core_1 = __webpack_require__(470);
exports.DENY_ERROR_MESSAGE_PREFIX = 'Please add the following to your .gitignore file (replace commas with new lines): ';
exports.ACCEPT_ERROR_MESSAGE_PREFIX = 'Please remove the following from your .gitignore file (might be a pattern, or add to .gitignore with a ! in front): ';
const respond = (notDenied, notAccepted, failOnError) => {
    const notDeniedString = notDenied.join(',');
    core_1.setOutput('not_denied', notDeniedString);
    if (notDenied.length > 0) {
        const denyErrorMessage = `${exports.DENY_ERROR_MESSAGE_PREFIX}${notDeniedString}`;
        core_1.error(denyErrorMessage);
    }
    const notAcceptedString = notAccepted.join(',');
    core_1.setOutput('not_accepted', notAcceptedString);
    if (notAccepted.length > 0) {
        const acceptErrorMessage = `${exports.ACCEPT_ERROR_MESSAGE_PREFIX}${notAcceptedString}`;
        core_1.error(acceptErrorMessage);
    }
    const requirementsAreMet = notDenied.length === 0 && notAccepted.length === 0;
    finalResponse(requirementsAreMet, failOnError);
};
const finalResponse = (requirementsAreMet, failOnError) => {
    if (requirementsAreMet) {
        core_1.setOutput('requirements_met', 'true');
    }
    else {
        core_1.setOutput('requirements_met', 'false');
        if (failOnError) {
            core_1.setFailed('A .gitignore error occurred, see above error logging for details.');
        }
    }
};
exports.default = respond;


/***/ }),

/***/ 87:
/***/ (function(module) {

module.exports = require("os");

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(470);
const gatherAllInputs_1 = __importDefault(__webpack_require__(267));
const parseGitIgnore_1 = __importDefault(__webpack_require__(935));
const filterDeniedAndAccepted_1 = __importDefault(__webpack_require__(745));
const respond_1 = __importDefault(__webpack_require__(24));
function run(inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { path, mustDeny, mustAccept, failOnError } = gatherAllInputs_1.default(inputs);
            const gitIgnoreLines = parseGitIgnore_1.default(path);
            const { notDenied, notAccepted } = filterDeniedAndAccepted_1.default(mustDeny, mustAccept, gitIgnoreLines);
            respond_1.default(notDenied, notAccepted, failOnError);
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            core_1.setFailed(error.message);
        }
    });
}
exports.default = run;
run();


/***/ }),

/***/ 267:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(470);
const gatherAllInputs = (inputs) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const pathInput = (_a = inputs === null || inputs === void 0 ? void 0 : inputs.path) !== null && _a !== void 0 ? _a : core_1.getInput('path');
    core_1.debug(`Input - path: ${pathInput}`);
    const mustDenyInput = (_c = (_b = inputs === null || inputs === void 0 ? void 0 : inputs.must_deny) !== null && _b !== void 0 ? _b : core_1.getInput('must_deny')) !== null && _c !== void 0 ? _c : '';
    core_1.debug(`Input - must_deny: ${mustDenyInput}`);
    const mustAcceptInput = (_e = (_d = inputs === null || inputs === void 0 ? void 0 : inputs.must_accept) !== null && _d !== void 0 ? _d : core_1.getInput('must_accept')) !== null && _e !== void 0 ? _e : '';
    core_1.debug(`Input - must_accept: ${mustAcceptInput}`);
    const failOnErrorInput = (_f = inputs === null || inputs === void 0 ? void 0 : inputs.fail_on_error) !== null && _f !== void 0 ? _f : core_1.getInput('fail_on_error');
    core_1.debug(`Input - fail_on_error: ${failOnErrorInput}`);
    const failOnError = failOnErrorInput === 'false' ? false : true;
    return {
        path: pathInput !== null && pathInput !== void 0 ? pathInput : '/',
        mustDeny: (_g = mustDenyInput === null || mustDenyInput === void 0 ? void 0 : mustDenyInput.split(',')) !== null && _g !== void 0 ? _g : [],
        mustAccept: (_h = mustAcceptInput === null || mustAcceptInput === void 0 ? void 0 : mustAcceptInput.split(',')) !== null && _h !== void 0 ? _h : [],
        failOnError,
    };
};
exports.default = gatherAllInputs;


/***/ }),

/***/ 431:
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
const os = __importStar(__webpack_require__(87));
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
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
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
function escapeData(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(431);
const os = __importStar(__webpack_require__(87));
const path = __importStar(__webpack_require__(622));
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
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = command_1.toCommandValue(val);
    process.env[name] = convertedVal;
    command_1.issueCommand('set-env', { name }, convertedVal);
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
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
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
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
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
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
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
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

/***/ 745:
/***/ (function(__unusedmodule, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const filterDeniedAndAccepted = (mustDeny, mustAccept, gitIgnore) => {
    const notDenied = mustDeny.filter((fileName) => fileName !== '' && gitIgnore.accepts(fileName));
    const notAccepted = mustAccept.filter((fileName) => fileName !== '' && gitIgnore.denies(fileName));
    return { notDenied, notAccepted };
};
exports.default = filterDeniedAndAccepted;


/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 773:
/***/ (function(__unusedmodule, exports) {

/**
 * Compile the given `.gitignore` content (not filename!)
 * and return an object with `accepts`, `denies` and `maybe` methods.
 * These methods each accepts a single filename and determines whether
 * they are acceptable or unacceptable according to the `.gitignore` definition.
 *
 *
 * @param  {String} content The `.gitignore` content to compile.
 * @return {Object}         The helper object with methods that operate on the compiled content.
 */
exports.compile = function (content) {
  var parsed = exports.parse(content),
      positives = parsed[0],
      negatives = parsed[1];
  return {
    accepts: function (input) {
      if (input[0] === '/') input = input.slice(1);
      return negatives[0].test(input) || !positives[0].test(input);
    },
    denies: function (input) {
      if (input[0] === '/') input = input.slice(1);
      return !(negatives[0].test(input) || !positives[0].test(input));
    },
    maybe: function (input) {
      if (input[0] === '/') input = input.slice(1);
      return negatives[1].test(input) || !positives[1].test(input);
    }
  };
};

/**
 * Parse the given `.gitignore` content and return an array
 * containing two further arrays - positives and negatives.
 * Each of these two arrays in turn contains two regexps, one
 * strict and one for 'maybe'.
 *
 * @param  {String} content  The content to parse,
 * @return {Array[]}         The parsed positive and negatives definitions.
 */
exports.parse = function (content) {
  return content.split('\n')
  .map(function (line) {
    line = line.trim();
    return line;
  })
  .filter(function (line) {
    return line && line[0] !== '#';
  })
  .reduce(function (lists, line) {
    var isNegative = line[0] === '!';
    if (isNegative) {
      line = line.slice(1);
    }
    if (line[0] === '/')
      line = line.slice(1);
    if (isNegative) {
      lists[1].push(line);
    }
    else {
      lists[0].push(line);
    }
    return lists;
  }, [[], []])
  .map(function (list) {
    return list
    .sort()
    .map(prepareRegexes)
    .reduce(function (list, prepared) {
      list[0].push(prepared[0]);
      list[1].push(prepared[1]);
      return list;
    }, [[], [], []]);
  })
  .map(function (item) {
    return [
      item[0].length > 0 ? new RegExp('^((' + item[0].join(')|(') + '))') : new RegExp('$^'),
      item[1].length > 0 ? new RegExp('^((' + item[1].join(')|(') + '))') : new RegExp('$^')
    ]
  });
};

function prepareRegexes (pattern) {
  return [
    // exact regex
    prepareRegexPattern(pattern),
    // partial regex
    preparePartialRegex(pattern)
  ];
};

function prepareRegexPattern (pattern) {
  return escapeRegex(pattern).replace('**', '(.+)').replace('*', '([^\\/]+)');
}

function preparePartialRegex (pattern) {
  return pattern
  .split('/')
  .map(function (item, index) {
    if (index)
      return '([\\/]?(' + prepareRegexPattern(item) + '\\b|$))';
    else
      return '(' + prepareRegexPattern(item) + '\\b)';
  })
  .join('');
}

function escapeRegex (pattern) {
  return pattern.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&");
}


/***/ }),

/***/ 935:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - No Types
const gitignore_parser_1 = __importDefault(__webpack_require__(773));
const fs_1 = __importDefault(__webpack_require__(747));
const path_1 = __webpack_require__(622);
const parseGitIgnore = (path) => {
    const gitIgnoreFile = fs_1.default.readFileSync(path_1.join(path, '.gitignore'), 'utf8');
    const gitIgnore = gitignore_parser_1.default.compile(gitIgnoreFile);
    return gitIgnore;
};
exports.default = parseGitIgnore;


/***/ })

/******/ });