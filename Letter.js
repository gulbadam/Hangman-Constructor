exports.Letter = Letter;

function Letter(ltr) {
    this.ltr = ltr;
    this.show = false;
    if (this.ltr == ' ') this.show = true;
}
Letter.prototype.printInfo = function() {
    if (this.show) {
        return this.ltr;
    }
    return '_ ';
};