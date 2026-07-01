/* ============================================================================
 * AGM PROPOSAL — PASSWORD GATE  (Cloudflare Pages Functions middleware)
 * ----------------------------------------------------------------------------
 * Runs in front of every request to this Pages project. Until a visitor submits
 * the correct password, they only ever receive the custom cover/login page
 * below — the real proposal (index.html) is never sent to the browser. The
 * password itself lives ONLY as an encrypted Cloudflare secret, never in this
 * code or in the client.
 *
 * ── ONE-TIME SETUP (Cloudflare dashboard) ──────────────────────────────────
 *   Workers & Pages → this project → Settings → Variables and Secrets →
 *   add, for BOTH Production and Preview:
 *     SITE_PASSWORD  = the shared password you give recipients   (mark Secret)
 *     GATE_SECRET    = any long random string, e.g. 40+ chars    (mark Secret)
 *   Then redeploy (or push a commit). That's it.
 *
 *   • Change the password anytime by editing SITE_PASSWORD (old links keep
 *     working; existing sessions stay valid because GATE_SECRET is unchanged).
 *   • To force everyone to re-enter, rotate GATE_SECRET or bump TOKEN_VERSION.
 *
 * ── LOCAL PREVIEW ───────────────────────────────────────────────────────────
 *   Put SITE_PASSWORD / GATE_SECRET in a `.dev.vars` file (git-ignored) and run
 *   `npx wrangler pages dev .`  — see .dev.vars.example.
 * ========================================================================== */

/* ── EDIT: the property / association name shown on the cover ─────────────── */
const PROPERTY_NAME = "Northpointe Corporate Center";

const COOKIE = "agm_gate";
const TOKEN_VERSION = "v1";                 // bump to invalidate every session
const MAX_AGE = 60 * 60 * 24 * 7;           // session length: 7 days
const enc = new TextEncoder();

/* HMAC-SHA256 → URL-safe base64 */
async function sign(secret, msg) {
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(msg));
  return btoa(String.fromCharCode.apply(null, new Uint8Array(sig)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/* the cookie value a valid session must carry */
function expectedToken(env) {
  const secret = env.GATE_SECRET || env.SITE_PASSWORD || "";
  return sign(secret, "authenticated:" + TOKEN_VERSION);
}

/* constant-time string compare (avoids timing leaks on the password/cookie) */
function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const ba = enc.encode(a), bb = enc.encode(b);
  if (ba.length !== bb.length) return false;
  let out = 0;
  for (let i = 0; i < ba.length; i++) out |= ba[i] ^ bb[i];
  return out === 0;
}

function readCookie(header, name) {
  const m = (header || "").match(new RegExp("(?:^|;\\s*)" + name + "=([^;]+)"));
  return m ? m[1] : null;
}

function htmlHeaders(extra) {
  return Object.assign({
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store, must-revalidate",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer"
  }, extra || {});
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Fail closed if the operator hasn't configured a password yet.
  if (!env.SITE_PASSWORD) {
    return new Response(
      coverHTML({ error: "Access is not configured yet. Set the SITE_PASSWORD secret in the Cloudflare Pages project settings, then redeploy." }),
      { status: 503, headers: htmlHeaders() }
    );
  }

  // Log out.
  if (url.pathname === "/__logout") {
    const headers = new Headers({ Location: "/" });
    headers.append("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
    return new Response(null, { status: 303, headers });
  }

  // Password submission.
  if (request.method === "POST" && url.pathname === "/__access") {
    let pw = "";
    try { pw = String((await request.formData()).get("password") || ""); } catch (e) {}
    if (safeEqual(pw, env.SITE_PASSWORD)) {
      const token = await expectedToken(env);
      const headers = new Headers({ Location: "/" });
      headers.append(
        "Set-Cookie",
        `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE}`
      );
      return new Response(null, { status: 303, headers });  // → home, now authenticated
    }
    return Response.redirect(url.origin + "/?e=denied", 303);
  }

  // Authenticated? Serve the requested asset (the real site).
  const token = readCookie(request.headers.get("Cookie"), COOKIE);
  if (token && safeEqual(token, await expectedToken(env))) {
    return next();
  }

  // Otherwise, show the cover/login screen for any path.
  const denied = url.searchParams.get("e") === "denied";
  return new Response(
    coverHTML({ error: denied ? "Incorrect password. Please try again." : "" }),
    { status: denied ? 401 : 200, headers: htmlHeaders() }
  );
}

/* ── the custom cover / login screen ─────────────────────────────────────── */
function coverHTML({ error }) {
  const err = (error || "").replace(/</g, "&lt;");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, nofollow" />
<title>AGM Real Estate Group — Access</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='%233A8DDE' d='M4 27 16 5l12 22h-5l-7-13-7 13z'/%3E%3C/svg%3E" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  :root{
    --navy:#0C2233; --navy-2:#0A2540; --blue:#5B9BE0; --blue-soft:#7FB2EA;
    --lavender:#B7B3E6; --page:#ECEAF6;
    --serif:'Playfair Display', Georgia, 'Times New Roman', serif;
    --sans:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  *{box-sizing:border-box;}
  html,body{height:100%;}
  body{margin:0; background:var(--page); font-family:var(--sans); color:#fff; -webkit-font-smoothing:antialiased; padding:14px;}
  .frame{
    position:relative; overflow:hidden; min-height:calc(100vh - 28px);
    background:linear-gradient(150deg,#0E2637 0%, #0A1E2D 60%, #081824 100%);
    border:1px solid var(--lavender); border-radius:3px;
    display:flex; flex-direction:column; padding:clamp(28px,4vw,56px) clamp(24px,5vw,72px);
  }
  .watermark{
    position:absolute; top:0; bottom:0; left:clamp(-14px,-0.5vw,4px);
    font-family:var(--serif); font-weight:700; font-size:min(24vh,236px); line-height:.86; letter-spacing:-.02em;
    color:var(--blue); opacity:.88; display:flex; flex-direction:column; align-items:flex-start; justify-content:center;
    pointer-events:none; user-select:none; z-index:0;
  }
  .watermark span{display:block;}
  .frame > *:not(.watermark){position:relative; z-index:1;}
  .topline{text-align:center; font-family:var(--serif); font-weight:600; font-size:clamp(15px,1.6vw,20px); letter-spacing:.01em; color:#fff; padding-top:6px;}
  .center{flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:34px; padding:40px 0;}
  .title-block{max-width:960px;}
  .title{font-family:var(--serif); font-weight:600; font-size:clamp(28px,4.4vw,58px); line-height:1.08; letter-spacing:.01em; text-transform:uppercase; color:#fff; margin:0;}
  .subtitle{font-family:var(--serif); font-weight:500; font-size:clamp(20px,3.1vw,42px); line-height:1.12; letter-spacing:.02em; text-transform:uppercase; color:var(--blue-soft); margin-top:10px;}
  .gate{display:flex; flex-direction:column; align-items:center; gap:18px; min-height:96px; justify-content:flex-start;}
  .access-btn{font-family:var(--sans); font-weight:600; font-size:14px; letter-spacing:.18em; text-transform:uppercase; color:var(--navy-2); background:#fff; border:1px solid #fff; border-radius:100px; padding:16px 52px; cursor:pointer; transition:transform .16s ease, box-shadow .16s ease; box-shadow:0 6px 22px rgba(0,0,0,.28);}
  .access-btn:hover{transform:translateY(-2px); box-shadow:0 10px 30px rgba(0,0,0,.36);}
  .access-btn:active{transform:translateY(0);}
  .pw:not([hidden]){display:flex; align-items:stretch; gap:10px; animation:fade .28s ease;}
  @keyframes fade{from{opacity:0; transform:translateY(6px);}to{opacity:1; transform:none;}}
  .pw input{font-family:var(--sans); font-size:14px; color:#fff; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.34); border-radius:100px; padding:15px 24px; width:min(74vw,300px); outline:none; transition:border-color .16s ease, background .16s ease;}
  .pw input::placeholder{color:rgba(255,255,255,0.5); letter-spacing:.04em;}
  .pw input:focus{border-color:var(--blue-soft); background:rgba(255,255,255,0.1);}
  .pw .go{font-family:var(--sans); font-weight:600; font-size:13px; letter-spacing:.14em; text-transform:uppercase; color:var(--navy-2); background:#fff; border:1px solid #fff; border-radius:100px; padding:0 26px; cursor:pointer; white-space:nowrap; transition:transform .16s ease;}
  .pw .go:hover{transform:translateY(-2px);}
  .err{min-height:18px; font-size:12.5px; letter-spacing:.02em; color:#F3A9A0; font-weight:500;}
  .foot{text-align:center; display:flex; flex-direction:column; gap:14px; padding-bottom:6px;}
  .tag{font-family:var(--sans); font-weight:500; font-size:clamp(12px,1.4vw,15px); letter-spacing:.34em; text-transform:uppercase; color:var(--blue-soft);}
  .contact{font-family:var(--sans); font-size:13px; letter-spacing:.02em; color:rgba(255,255,255,0.82); font-variant-numeric:tabular-nums;}
  @media(max-width:560px){.watermark{font-size:26vh; opacity:.85;} .contact{font-size:11.5px;} .pw{flex-direction:column; align-items:center;} .pw .go{padding:13px 26px;}}
</style>
</head>
<body>
  <div class="frame">
    <div class="watermark" aria-hidden="true"><span>A</span><span>G</span><span>M</span></div>
    <header class="topline">AGM Real Estate Group, LLC</header>
    <main class="center">
      <div class="title-block">
        <h1 class="title">Proposal for Management Services</h1>
        <div class="subtitle">${PROPERTY_NAME}</div>
      </div>
      <form class="gate" id="gate" method="POST" action="/__access" autocomplete="off">
        <button type="button" class="access-btn" id="accessBtn">Access</button>
        <div class="pw" id="pwWrap" hidden>
          <input type="password" name="password" id="pw" placeholder="Enter password" autocomplete="current-password" aria-label="Password" required />
          <button type="submit" class="go">Enter&nbsp;&rarr;</button>
        </div>
        <div class="err" role="alert" id="err">${err}</div>
      </form>
    </main>
    <footer class="foot">
      <div class="tag">Driving Market Prowess</div>
      <div class="contact">206.&nbsp;622.&nbsp;8600 &nbsp;|&nbsp; agmrealestategroup.com &nbsp;|&nbsp; 12330 Northup Way, Bellevue, WA 98005</div>
    </footer>
  </div>
  <noscript><style>#pwWrap{display:flex !important;} #accessBtn{display:none;}</style></noscript>
  <script>
    (function(){
      var btn=document.getElementById('accessBtn'), wrap=document.getElementById('pwWrap'), input=document.getElementById('pw');
      function reveal(){ wrap.hidden=false; btn.style.display='none'; if(input) input.focus(); }
      if(btn) btn.addEventListener('click', reveal);
      if(document.getElementById('err').textContent.trim()) reveal();
    })();
  </script>
</body>
</html>`;
}
