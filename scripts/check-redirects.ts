/* Redirect check: no loops, no self-redirects, destinations return 200. */
const BASE = process.env.AUDIT_BASE ?? 'http://localhost:4300';

const REDIRECTS = [
  '/website-doctor-profile/dr-varadharajan-v-dr-varadharajan-v-in-chennai?doctorId=1879',
];

let failures = 0;

async function main() {
  for (const src of REDIRECTS) {
    const res = await fetch(BASE + src, {
      redirect: 'manual',
      signal: AbortSignal.timeout(10000),
    });
    const loc = res.headers.get('location') ?? '';
    if (![301, 307, 308].includes(res.status)) {
      failures++;
      console.log(`FAIL ${src}: expected redirect, got ${res.status}`);
      continue;
    }
    const dest = new URL(loc, BASE).pathname;
    if (dest === new URL(src, BASE).pathname) {
      failures++;
      console.log(`FAIL ${src}: self-redirect`);
      continue;
    }
    const destRes = await fetch(BASE + dest, {
      redirect: 'manual',
      signal: AbortSignal.timeout(10000),
    });
    if (destRes.status !== 200) {
      failures++;
      console.log(`FAIL ${src} -> ${dest}: destination ${destRes.status}`);
      continue;
    }
    console.log(`ok ${src} -> ${res.status} -> ${dest} (${destRes.status})`);
  }
  console.log(failures ? `${failures} FAILURES` : 'ALL PASS');
  process.exit(failures ? 1 : 0);
}
main().catch((e) => { console.error(e); process.exit(1); });
