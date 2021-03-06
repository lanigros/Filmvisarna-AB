export default class ChangeListener {

  constructor() {
    // Only allow one file listener instance
    if (ChangeListener.one) {
      throw (new Error('Only create one ChangeListener instance!'));
    }
    ChangeListener.one = true;
    // Connect to a SSE source that tells us when files changes
    this.eventSource = new EventSource("/changes");
    this.eventSource.onmessage = event => this.fileChange(event.data);
    // Memory for event handlers
    this.events = [];
  }

  // Register event handlers for listening on changes
  // to specific files
  on(file, func) {
    this.events.push({ file, func });
  }

  // Removes all events for a given file
  remove(file) {
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].file === file) {
        this.events.splice(i, 1);
        i--;
      }
    }
  }

  // determines if there is a listener on a given file
  contains(file) {
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].file === file) {
        return true;
      }
    }

    return false;
  }

  fileChange(filePath) {

    if (filePath.includes('.git')) { return; }
    // Loop through registered events and call them on file match
    this.events.forEach(({ file, func }) => {
      filePath.includes(file) && func()
    });
    // Note: 
    // You SHOULD NOT reload the page for json files
    // that can be change usin JSON._save
    // For now: Do not reload on any json file changes
    if (filePath.slice(-5) === '.json') {
      return;
    }
    // Reload the page on changes (same behavior as LiveServer)
    location.reload();
  }

}