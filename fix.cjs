const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.ts')) results.push(file);
        }
    });
    return results;
}

const files = walk('./src');
files.push('./api/index.ts');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace relative imports (starting with . or ..) to add .js, 
    // BUT only if it doesn't already end with .js or .json
    content = content.replace(/from\s+["'](\.[^"']+)["']/g, (match, p1) => {
        if (p1.endsWith('.js') || p1.endsWith('.json')) return match;
        // Check if it imports a directory (like ../config)
        // If the path exists as a directory, append /index.js
        const resolvedPath = path.resolve(path.dirname(file), p1);
        try {
            const stat = fs.statSync(resolvedPath);
            if (stat.isDirectory()) {
                return `from "${p1}/index.js"`;
            }
        } catch (e) {
            // Might be a file without extension
        }
        return `from "${p1}.js"`;
    });
    
    fs.writeFileSync(file, content);
});
console.log('Fixed imports!');
