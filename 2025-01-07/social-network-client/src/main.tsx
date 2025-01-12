import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/app/App.tsx'
import * as Sentry from "@sentry/react";



Sentry.init({
  dsn: "https://106544dd7f0888e8cf6de5f307cd654f@o4508091701592065.ingest.us.sentry.io/4508629353234432",
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/jb\.noop\.co\.il/],
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
