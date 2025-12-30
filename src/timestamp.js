const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '\x1b[33m!> \x1b[0m'
});

function formatDate(date) {
  const pad = (num) => num.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

// update timestamp
function updateHeader() {
  const now = Math.floor(Date.now() / 1000);
  process.stdout.write(`\x1b[s\x1b[8;1H\x1b[32m       󰞌 Seconds since Jan 01 1970: ${now}\x1b[0m\x1b[K\x1b[u`);
}

function handleInput(line) {
  const input = line.trim();

  if (input.toLowerCase() === 'q') {
    process.exit(0);
  }

  if (!input) {
    rl.prompt();
    return;
  }

  if (/^\d+$/.test(input)) {
    const ts = parseInt(input, 10);
    const date = new Date(ts * 1000);
    console.log(`\n\x1b[32m  Result: ${formatDate(date)}\x1b[0m`);
  } else {
    const parsedMs = Date.parse(input);
    if (!isNaN(parsedMs)) {
      const ts = Math.floor(parsedMs / 1000);
      console.log(`\n\x1b[32m  Result: ${ts}\x1b[0m`);
    } else {
      console.log(`\n\x1b[31m  Format error.\x1b[0m`);
    }
  }
  rl.prompt();
}
console.clear();

// lets print ascii art
console.log(`\x1b[32m
   _    _                      _                        
  | |_(_)_ __ ___    ___  ___| |_ __ _ _ __ ___  _ __  
  | __| | '_ \` _ \\ / _ \\/ __| __/ _\` | '_ \` _ \\| '_ \\ 
  | |_| | | | | | |  __/\\__ \\ || (_| | | | | | | |_) | 
   \\__|_|_| |_| |_|\\___||___/\\__\\__,_|_| |_| |_| .__/  
                                               |_|     \x1b[0m`);

console.log('');
console.log('');
console.log('\x1b[90mEnter timestamp or date (YYYY-MM-DD HH:MM:SS format). Q - exit.\x1b[0m');

// run timer
setInterval(updateHeader, 1000);
updateHeader();

rl.on('line', handleInput);
rl.prompt();