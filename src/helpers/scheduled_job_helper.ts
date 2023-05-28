import type { ScheduledJob } from "../jobs/types/scheduled_job.ts";
import { bot } from "../bot.ts";
import { Cron } from '../../deps.ts';

export async function createScheduledJob(job: ScheduledJob): Promise<void> {
    const start = await job.setup(bot)
    if (start) {
        console.log('[Bot] Job registered:', job.name, 'with schedule', job.schedule);
        new Cron(job.schedule, async () => {
            console.log('[Bot] Job', job.name, 'started');
            try {
                await job.execute(bot);
                console.log('[Bot] Job', job.name, 'completed');
            }
            catch {
                console.warn('[Bot] Job', job.name, 'Failed during execution');
            }
        });
    } else {
        console.warn('[Bot] Job', job.name, 'failed to match the job prerequisites 💢');
    }
}