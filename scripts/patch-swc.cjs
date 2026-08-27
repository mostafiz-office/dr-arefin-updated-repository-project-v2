const fs = require('fs');
const paths = [
  'node_modules/@swc/core/binding.js',
  'node_modules/@vitejs/plugin-react-swc/node_modules/@swc/core/binding.js',
];
paths.forEach(f => {
  try {
    let c = fs.readFileSync(f, 'utf8');
    if (!c.includes('return false;')) {
      c = c.replace('const isMusl = () => {', 'const isMusl = () => { return false;');
      fs.writeFileSync(f, c);
      console.log('Patched', f);
    }
  } catch {}
});
