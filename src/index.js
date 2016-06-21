import { index, deleteIndex } from 'ochre-indexer';
import kue from 'kue';

const redis = {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || '127.0.0.1'
};
const queue = kue.createQueue({
    redis
});

queue.process('index', (job, done) => {
    console.log('indexing: ' + job.data.file);
    index(job.data.file, done);
});
queue.process('delete', (job, done) => {
    console.log('deleting: ' + job.data.file);
    deleteIndex(job.data.file, done);
});
