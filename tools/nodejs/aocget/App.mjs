import yargs from "yargs";

export default yargs(process.argv.slice(2))
.scriptName("aocget")
.usage('$0 <cmd> [args]')
.command('day [year] [day]', 'pulls the puzzle for the given day', (yargs) => {
  yargs.positional('name', {
    type: 'string',
    describe: 'the name to say hello to'
  })
}, function (argv) {
  console.log('hello', argv.name, 'welcome to yargs!')
})
.help()
.argv;