"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLogger = exports.AuditLogger = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const rotating_file_stream_1 = require("rotating-file-stream"); // Ensure correct import
const pino_1 = __importDefault(require("pino"));
dotenv_1.default.config();
// Setup log directory
const logDirectory = path_1.default.join(__dirname, "../logs"); // Adjust the path as needed
// Ensure log directory exists
if (!fs_1.default.existsSync(logDirectory)) {
  fs_1.default.mkdirSync(logDirectory);
}
// Create rotating streams for audit and error logs
const auditLogStream = (0, rotating_file_stream_1.createStream)("audit.log", {
  interval: "1d", // Rotate daily
  path: logDirectory,
  maxFiles: 3, // Only keep logs for 3 days
});
const errorLogStream = (0, rotating_file_stream_1.createStream)("error.log", {
  interval: "1d",
  path: logDirectory,
  maxFiles: 3,
});
// Create Pino loggers for audit and error
const auditLogger = (0, pino_1.default)(auditLogStream);
const errorLogger = (0, pino_1.default)(errorLogStream);
// Middleware for logging every request
const AuditLogger = async (req) => {
  const logData = {
    method: req.method,
    url: req.url,
    user: req.user || "Anonymous",
    timestamp: new Date().toISOString(),
  };
  auditLogger.info(logData);
};
exports.AuditLogger = AuditLogger;
// Error handler for logging errors
const ErrorLogger = (error, req, res) => {
  errorLogger.error({
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    user: req.user || "Anonymous",
    timestamp: new Date().toISOString(),
  });
  res.status(500).send({ error: "Internal Server Error" });
};
exports.ErrorLogger = ErrorLogger;
