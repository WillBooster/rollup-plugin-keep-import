"use strict";var n={name:"plugin-auto-install",factory:n=>{const t=n("child_process"),e=n("crypto"),c=n("fs"),r=n("path"),o="plugin-auto-install v2.0.1";let i=!1,s="";function a(n){try{const t=e.createHash("sha256"),o=r.join(n.cwd,"yarn.lock");c.statSync(o,{throwIfNoEntry:!1})&&t.update(c.readFileSync(o,"utf8"));for(const e of n.workspaces.map((n=>n.cwd)).sort()){const n=r.join(e,"package.json"),o=JSON.parse(c.readFileSync(n,"utf8")),i=Object.keys(o).filter((n=>n.endsWith("ependencies"))),s=[];for(const n of i)s.push(...Object.entries(o[n]).map((([n,t])=>`${n}: ${t}`)));t.update(s.sort().join(","))}return t.digest("hex")}catch{}}function l(n){try{const t=d(n);return c.readFileSync(r.join(t,"hash"),"utf8")}catch{}}function u(n,t){if(!n||n===s)return!1;try{const e=d(t);c.mkdirSync(e,{recursive:!0}),c.writeFileSync(r.join(e,"hash"),n),c.writeFileSync(r.join(e,".gitignore"),".gitignore\nhash"),console.info(`${o} updated dependency hash: ${n}`),s=n}catch{}return!0}function d(n){return r.join(n.cwd,".yarn","plugins","plugin-auto-install")}return{hooks:{validateProject(n){i=!0;const t=a(n);t&&t===l(n)||u(t,n)},afterAllInstalled(n){i=!1;const t=a(n);t&&t===l(n)||u(t,n)},async setupScriptEnvironment(n,e){if(!i)try{const c=a(n);if(c&&c===l(n))return;if(!u(c,n))return;console.info(`${o} is running 'yarn install' due to dependency changes.`),t.spawnSync("yarn",["install"],{cwd:n.cwd,env:e}),console.info(`${o} finished 'yarn install'.`)}catch{}}}}}};module.exports=n;
//# sourceMappingURL=index.js.map
