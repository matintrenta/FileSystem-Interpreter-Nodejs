const fs = require('fs')
const path = require('path')

var command = []
const cmdList = ["write", "read"]

const cmd = new Map([
    ['write', function (content) {

        // // if (command.length > 3) {
        // //     for (let s = 3; s < command.length; s++) {
        // //         command[2] += ' ' + command[s]
        // //     }
        // // } //console.log('contenido: ' + command[2])

        fs.writeFile(`./${command[1]}`, content.toString().trim(), (err) => {
            if (!err) {
                console.log('\nArchivo creado/modificado\n')
            } else {
                console.log(`error: ${err}`)
            }
        })
    }],

    ['read', function (notnecesary) {

        const clientPath = path.join(__dirname + '/' + command[1])

        fs.readFile(clientPath.trim(), (err, content) => {
            if (err) { console.log(err) }
            const c = content.toString().trim()
            console.log(`\n "${c}" \n`)
        })
    }]
])

//console.log(cmdList)

function listen(fn) {
    var stdin = process.openStdin();
    stdin.addListener("data", fn)
}

console.log("\n  - File Sistem CLI Project -  \n")

listen((input) => {

    input = input.toString().split(`"`)
    command = input[0].toString().split(" ")
    var commandIsKnown = false

    for (var t = 0; t < cmdList.length; t++) {

        if (command[0] == cmdList[t]) {

            commandIsKnown = true
            break;
        }
    }

    if (commandIsKnown) {

        //if (command[0] == 'write' && input[1] === "String")
            cmd.get(command[0])(input[1])

        //else if (command[0] == 'read')
            //cmd.get(command[0])(command[1])

    } else if (command.length < 2) {// || input.length === ["",""]

        // // // if (command[0] == 'write' && input[1] === "String") {
        // // //     console.log(`you may want to say:\n\n   write < file-name > < text >`)
        // // // }
        // // // else if (command[0] == 'read') {
        // // //     console.log(`you may want to say:\n\n   read < file-name >`)
        // // // }
        console.log(`missing property`)//you may want to say:\n\n    ${command[0].trim() + '< text >'}

    } else console.log(`unknown command: ${command[0]}`)
})