import type { ScheduledJob } from "../jobs/types/scheduled_job.ts";
import { bot } from "../bot.ts";
import { Cron } from '../../deps.ts';
import { log, logWarning } from "../services/log_helper.ts";

export async function createScheduledJob(job: ScheduledJob): Promise<void> {
    const start = await job.setup(bot)
    if (start) {
        log('Job registered:', job.name, 'with schedule', job.schedule);
        new Cron(job.schedule, async () => {
            log('Job', job.name, 'started');
            try {
                await job.execute(bot);
                log('Job', job.name, 'completed');
            }
            catch {
                logWarning(`Job ${job.name} Failed during execution`);
            }
        });
    } else {
        logWarning(`Job ${job.name} failed to setup job 💢`);
    }
}