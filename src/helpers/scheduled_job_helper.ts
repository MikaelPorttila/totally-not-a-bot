import type { ScheduledJob } from "../jobs/types/scheduled_job.ts";
import { bot } from "../bot.ts";
import { Cron } from '../../deps.ts';

export async function createScheduledJob(job: ScheduledJob): Promise<void> {
    const start = await job.setup(bot)
    if (start) {
        console.log('[Bot] Job registered:', job.name, 'with schedule', job.schedule);
        new Cron(job.schedule, () => {
            console.log('[Bot] Job', job.name, 'started');
            job.execute(bot);
            console.log('[Bot] Job', job.name, 'completed');
        });
    } else {
        console.warn('[Bot] Job', job.name, 'failed to match the job prerequisites 💢');
    }
}