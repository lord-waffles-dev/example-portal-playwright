import { RequestedScheduleDate } from '../models/api/consultation.model';

/**
 * Generates random future dates starting from 5 days in the future up to 9 weeks ahead
 * @param count Number of dates to generate (default: 3)
 * @returns Array of RequestedScheduleDate objects sorted chronologically
 */
export function generateRandomFutureDates(count = 3): RequestedScheduleDate[] {
  // Constants for time calculations
  const DAY_IN_MS = 24 * 60 * 60 * 1000;
  const FIVE_DAYS_IN_MS = 5 * DAY_IN_MS;
  const NINE_WEEKS_IN_MS = 63 * DAY_IN_MS; // 9 weeks = 63 days

  // Starting point (5 days from now)
  const startTime = Date.now() + FIVE_DAYS_IN_MS;
  // End point (9 weeks from now)
  const endTime = Date.now() + FIVE_DAYS_IN_MS + NINE_WEEKS_IN_MS;

  const dates: RequestedScheduleDate[] = [];

  for (let i = 0; i < count; i++) {
    // Generate a random timestamp between start and end times
    const randomTimestamp = startTime + Math.random() * (endTime - startTime);

    dates.push({
      requestedDateTime: new Date(randomTimestamp).toISOString(),
      priority: i + 1
    });
  }

  // Sort dates chronologically
  return dates.sort((a, b) =>
    new Date(a.requestedDateTime).getTime() - new Date(b.requestedDateTime).getTime()
  );
}
