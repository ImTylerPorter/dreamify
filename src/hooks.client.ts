import { handleErrorWithSentry, replayIntegration } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: 'https://cea51efed5876b31406afeb21ef2b8bb@o4508497565974528.ingest.us.sentry.io/4508497569316864',

	tracesSampleRate: 1.0
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
