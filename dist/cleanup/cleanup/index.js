"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.cleanup = void 0;
var core = __importStar(require("@actions/core"));
var helpers_1 = require("../helpers");
/**
 * When the GitHub Actions job is done, clean up any environment variables that
 * may have been set by the configure-aws-credentials steps in the job.
 *
 * Environment variables are not intended to be shared across different jobs in
 * the same GitHub Actions workflow: GitHub Actions documentation states that
 * each job runs in a fresh instance.  However, doing our own cleanup will
 * give us additional assurance that these environment variables are not shared
 * with any other jobs.
 */
function cleanup() {
    try {
        // The GitHub Actions toolkit does not have an option to completely unset
        // environment variables, so we overwrite the current value with an empty
        // string. The AWS CLI and AWS SDKs will behave correctly: they treat an
        // empty string value as if the environment variable does not exist.
        core.exportVariable('AWS_ACCESS_KEY_ID', '');
        core.exportVariable('AWS_SECRET_ACCESS_KEY', '');
        core.exportVariable('AWS_SESSION_TOKEN', '');
        core.exportVariable('AWS_DEFAULT_REGION', '');
        core.exportVariable('AWS_REGION', '');
    }
    catch (error) {
        core.setFailed((0, helpers_1.errorMessage)(error));
    }
}
exports.cleanup = cleanup;
/* c8 ignore start */
if (require.main === module) {
    try {
        cleanup();
    }
    catch (error) {
        core.setFailed((0, helpers_1.errorMessage)(error));
    }
}
