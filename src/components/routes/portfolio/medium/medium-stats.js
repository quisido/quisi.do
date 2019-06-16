import EventEmitter from 'event-emitter';

const MEDIUM_STATS_API =
  process.env.REACT_APP_MEDIUM_STATS_API ||
  'https://api.charlesstover.com/npm/downloads';

class MediumStats extends EventEmitter {

  data = null;

  error = null;

  loading = false;

  fetch = () => {

    // Loaded
    if (this.data !== null) {
      return Promise.resolve(this.data);
    }

    // Error
    if (this.error !== null) {
      return Promise.reject(this.error);
    }

    // Loading
    if (this.loading) {
      return new Promise((resolve, reject) => {
        this.on('data', resolve);
        this.on('error', reject);
      });
    }

    // Instantiate
    this.loading = true;
    return fetch(MEDIUM_STATS_API)
      .then(response => response.json())
      .then(data => {
        this.data = data;
        this.error = null;
        this.loading = false;
        this.emit('data', this.data);
        return this.data;
      })
      .catch(err => {
        this.error = err;
        this.loading = false;
        this.emit('error', err);
        throw err;
      });
  };
};

export default new MediumStats();
