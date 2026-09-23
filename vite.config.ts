import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'contact-logging-service',
        configureServer(server) {
          server.middlewares.use('/api/contact', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const payload = JSON.parse(body || '{}');
                  const messageId = `MSG-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
                  const logEntry = {
                    id: messageId,
                    timestamp: new Date().toISOString(),
                    name: payload.name || 'Anonymous',
                    email: payload.email || 'N/A',
                    subject: payload.subject || 'General Inquiry',
                    messageLength: payload.message?.length || 0,
                    status: 'DELIVERED_TO_LOGGER',
                  };

                  console.log('\n[CONTACT LOGGING SERVICE] New message received:');
                  console.log(JSON.stringify(logEntry, null, 2));

                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 200;
                  res.end(
                    JSON.stringify({
                      success: true,
                      messageId,
                      timestamp: logEntry.timestamp,
                      message: 'Message received and recorded by logging service.',
                    })
                  );
                } catch (e) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: 'Invalid JSON request payload' }));
                }
              });
            } else if (req.method === 'GET') {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(
                JSON.stringify({
                  status: 'healthy',
                  service: 'Portfolio Contact Logging Service',
                  timestamp: new Date().toISOString(),
                })
              );
            } else {
              res.statusCode = 405;
              res.end('Method Not Allowed');
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
