class Player {
  constructor(uid, name) {
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

module.exports = Player;
