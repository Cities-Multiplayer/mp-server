function MPDebug(section) {
    this.section = section;
}

MPDebug.prototype.log = function(message) {
    console.log(this.section + ": " + message);
};

module.exports = MPDebug;