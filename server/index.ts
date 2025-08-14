import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { startStoryCleanupScheduler } from "./story-cleaner";

const app = express();

// Enhanced CORS configuration for development and production
app.use((req, res, next) => {
  const origin = req.get('origin');
  const host = req.get('host');
  
  console.log(`CORS DEBUG: Origin=${origin}, Host=${host}, Method=${req.method}`);
  
  // Allow requests from development and production origins
  if (process.env.NODE_ENV === 'production') {
    // For same-domain requests on Render, origin might be null or the same domain
    if (!origin || origin === `https://${host}` || origin === `http://${host}`) {
      res.header('Access-Control-Allow-Origin', origin || `https://${host}`);
    }
  } else {
    // Development mode: be more permissive but still secure
    const allowedOrigins = [
      'http://localhost:5000',
      'http://127.0.0.1:5000',
      `http://${host}`,
      `https://${host}`,
    ];
    
    if (!origin || allowedOrigins.some(allowed => origin?.startsWith(allowed))) {
      res.header('Access-Control-Allow-Origin', origin || `http://${host}`);
    }
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Cookie');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
    // Start story cleanup scheduler
    startStoryCleanupScheduler();
  });
})();
