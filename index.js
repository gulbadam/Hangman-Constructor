const words = require('./words.js'),
    Word = require('./Word.js'),
    Letter = require('./Letter.js'),
    inquirer = require('inquirer'),
    chalk = require('chalk'),
    figlet = require('figlet'),
    randoWord = words.randoWord,
    boxen = require("boxen");
let letterGuessed;
const myWord = new Word.Word(words.randoWord);
let maxGuesses = 15;

function takeAGuess() {
    console.log(chalk.yellow(boxen(myWord.toString(), {
        padding: 1,
        borderStyle: 'double',
        borderColor: 'green',
    })));
    if (myWord.guessesMade.length >= maxGuesses) {
        console.log(chalk.blue(boxen('You have no more guesses!!!', {
            padding: 1,
            borderStyle: 'double',
            backgroundColor: 'red'
        })));
        return; //Game over
    }
    inquirer
        .prompt([{
            name: 'letter',
            type: 'text',
            message: 'Enter a letter:',
            validate: function(str) {
                var regEx = new RegExp('^[a-zA-Zs]{1,1}$');
                return regEx.test(str);
            },
        }, ])
        .then(function(answer) {
            //Game control
            var letter = answer.letter;
            myWord.findLetter(letter);

            if (myWord.isComplete()) {
                console.log(chalk.yellow(boxen(
                    myWord.toString(), {
                        padding: 1,
                        borderStyle: 'double',
                        borderColor: 'green',
                    }
                )));
                console.log(chalk.green(boxen('Yes! It was ' + myWord.toString() + '!', {
                    padding: 1,
                    borderStyle: 'double',
                    borderColor: 'green',
                    backgroundColor: 'magenta'
                })));
                return; //Winner
            }

            console.log(chalk.cyan('-------------------\n'));
            console.log(chalk.magenta(boxen(
                'You have ' +
                (maxGuesses - myWord.guessesMade.length) +
                ' guesses left.', { padding: 1, borderStyle: 'double', borderColor: 'yellow' }
            )));
            takeAGuess();
        });
}
figlet.text(
    'Hangman Computer!', {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default',
    },
    function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.magentaBright.bgBlue.bold(data));
        takeAGuess();
    }
);