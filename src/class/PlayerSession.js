class PlayerSession {
  constructor({ uid = null, name = null }) {
    this.uid = uid;
    this.name = name;
  }

  getUid() {
    return this.uid;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }
}

module.exports = PlayerSession;
