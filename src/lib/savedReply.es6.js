import localStorageAvailable from './localStorageAvailable';

var _saved = null;

function set(thingId, reply) {
  reply = reply && reply.trim();

  if (!reply) {
    return;
  }

  var saved = {
    thingId,
    reply,
  };

  if (localStorageAvailable()) {
    global.localStorage.setItem('savedReply', JSON.stringify(saved));
  }
  _saved = saved;
}

function get(thingId) {
  var saved;

  if (_saved) {
    saved = _saved;
  } else if (localStorageAvailable()) {
    var savedReply = global.localStorage.getItem('savedReply');

    try {
      saved = JSON.parse(savedReply);
    } catch (e) {
      return '';
    }

    _saved = saved;
  }

  if (saved && saved.thingId === thingId) {
    return saved.reply || '';
  }
}

function clear() {
  if (localStorageAvailable()) {
    global.localStorage.removeItem('savedReply');
  }
  _saved = undefined;
}

export default {
  set,
  get,
  clear,
};
