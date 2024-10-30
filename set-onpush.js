const fs = require('fs');
const path = require('path');
const glob = require('glob');

const componentFiles = glob.sync('src/app/**/*.component.ts');

componentFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    if (content.includes('@Component') && !content.includes('changeDetection: ChangeDetectionStrategy.OnPush')) {
        content = content.replace(
            /@Component\(\{([\s\S]*?)\}\)/,
            `@Component({$1,\n  changeDetection: ChangeDetectionStrategy.OnPush })`
        );
        content = "import { ChangeDetectionStrategy } from '@angular/core';\n" + content;

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated: ${file}`);
    }
});

console.log('ChangeDetectionStrategy.OnPush added to all components');
