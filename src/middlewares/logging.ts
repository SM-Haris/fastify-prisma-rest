import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { createStream } from "rotating-file-stream"; // Ensure correct import
import pino from "pino";
import { HTTP_STATUS } from "../lib/constants/api";

dotenv.config();

// Setup log directory
const logDirectory = path.join(__dirname, "../logs"); // Adjust the path as needed

// Ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Create rotating streams for audit and error logs
const auditLogStream = createStream("audit.log", {
  interval: "1d", // Rotate daily
  path: logDirectory,
  maxFiles: 3, // Only keep logs for 3 days
});

const errorLogStream = createStream("error.log", {
  interval: "1d",
  path: logDirectory,
  maxFiles: 3,
});

// Create Pino loggers for audit and error
const auditLogger = pino(auditLogStream);
const errorLogger = pino(errorLogStream);

// Middleware for logging every request
export const AuditLogger = async (req: FastifyRequest) => {
  const logData = {
    method: req.method,
    url: req.url,
    user: req.user || "Anonymous",
    timestamp: new Date().toISOString(),
  };
  auditLogger.info(logData);
};

// Error handler for logging errors
export const ErrorLogger = (
  error: FastifyError,
  req: FastifyRequest,
  res: FastifyReply
) => {
  errorLogger.error({
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    user: req.user || "Anonymous",
    timestamp: new Date().toISOString(),
  });

  if (error.statusCode && error.message) {
    res.status(error.statusCode).send({ error: error.message });
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500).send({ error: "Internal Server Error" });
};
