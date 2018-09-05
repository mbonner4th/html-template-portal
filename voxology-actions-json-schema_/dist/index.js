"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ajv = require("ajv");
var allSchema = require("../schema/all-actions.json");
var assignSchema = require("../schema/assign-variable.json");
var callflowSchema = require("../schema/callflow-config.json");
var ccmlSchema = require("../schema/ccml.json");
var collectSchema = require("../schema/collect.json");
var conferenceSchema = require("../schema/conference.json");
var declarationSchema = require("../schema/function-declaration.json");
var detectSchema = require("../schema/detect.json");
var dialSchema = require("../schema/dial.json");
var foreach = require("../schema/foreach.json");
var functionSchema = require("../schema/function.json");
var gotoSchema = require("../schema/goto.json");
var hangupSchema = require("../schema/hangup.json");
var ifSchema = require("../schema/if.json");
var labelSchema = require("../schema/label.json");
var pauseSchema = require("../schema/pause.json");
var playSchema = require("../schema/play.json");
var queueSchema = require("../schema/queue.json");
var recordSchema = require("../schema/record.json");
var recordMessageSchema = require("../schema/record-message.json");
var redirectSchema = require("../schema/redirect.json");
var rejectSchema = require("../schema/reject.json");
var responseSchema = require("../schema/response.json");
var saySchema = require("../schema/say.json");
var sessionSchema = require("../schema/session.json");
var smsSchema = require("../schema/sms.json");
var stopSchema = require("../schema/stop.json");
var transferSchema = require("../schema/transfer.json");
var varSchema = require("../schema/var.json");
var webhookSchema = require("../schema/webhook.json");
var schemas = [
    allSchema,
    assignSchema,
    callflowSchema,
    ccmlSchema,
    conferenceSchema,
    collectSchema,
    detectSchema,
    declarationSchema,
    dialSchema,
    foreach,
    functionSchema,
    gotoSchema,
    hangupSchema,
    ifSchema,
    labelSchema,
    pauseSchema,
    playSchema,
    queueSchema,
    redirectSchema,
    recordSchema,
    recordMessageSchema,
    rejectSchema,
    responseSchema,
    saySchema,
    sessionSchema,
    smsSchema,
    stopSchema,
    transferSchema,
    varSchema,
    webhookSchema
];
function validate(data) {
    var ajv = new Ajv();
    ajv.addSchema(schemas);
    var v = ajv.compile(responseSchema);
    v(data);
    return v.errors ? v.errors : [];
}
exports.validate = validate;
//# sourceMappingURL=index.js.map