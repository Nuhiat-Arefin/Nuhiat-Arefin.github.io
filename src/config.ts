/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT: THE ONLY FILE YOU NEED TO EDIT
 * ─────────────────────────────────────────────────────────────
 *  Every section of the site reads from this file.
 *  To add a new project / paper / achievement in the future,
 *  just append a new object to the corresponding array below,
 *  no component changes required.
 */

export interface Link {
  label: string
  url: string
}

export interface Issue {
  repo: string
  number: number
  title: string
  state: 'open' | 'closed'
  url?: string
  note?: string
}

export interface Project {
  slug: string
  title: string
  org: string
  period: string
  summary: string
  description?: string
  tags: string[]
  links: Link[]
  issues?: Issue[]
  privateReports?: Array<{ project: string; title: string; url: string }>
  refs?: Record<string, string>
  featured?: boolean
}

export interface ResearchItem {
  title: string
  venue: string
  period: string
  authors?: string
  description: string
  tags: string[]
  links: Link[]
  cve?: string
}

export interface Achievement {
  title: string
  detail: string
  year: string
}

export interface SkillGroup {
  name: string
  items: string[]
}

/* ── Identity ─────────────────────────────────────────────── */

export const identity = {
  name: 'Nuhiat Arefin',
  handle: 'Nuhiat-Arefin',
  role: 'CS Undergrad · Security Researcher · Open-Source Contributor',
  tagline: 'I break software before the bad guys do.',
  location: 'Bangladesh',
  linkedin: 'https://www.linkedin.com/in/nuhiat-arefin-15a2273b8/',
  twitter: 'https://x.com/nuhiatarefin',
  email: 'nuhiatarefin@gmail.com',
  github: 'https://github.com/Nuhiat-Arefin',
  resumeUrl: '/resume.pdf', // hosted from public/
}

export const about = [
  "I'm an undergraduate studying Computer Science and Engineering at the Islamic University of Technology (IUT), on a partial scholarship. I enjoy using fuzzing to find real bugs, and I contribute fixes and tests back to open-source projects.",
  'My work spans grammar-inference research, differential fuzzing of Bitcoin Miniscript implementations, and systems programming in Rust for Wayland desktops. As a GSoC 2026 contributor with CCExtractor Development I built Background and Clipboard portals for wlroots, took the Usb portal and ScreenCast audio support upstream, and got a double-unref memory-corruption fix merged into xdg-desktop-portal.',
  'My taste for problem-solving was shaped by math olympiads. I advanced through several rounds of the Bangladesh Math Olympiad to compete at the national level, and took Art of Problem Solving courses in Number Theory and Counting & Probability. These days the same rigor goes into debugging complex systems and breaking parsers.',
]

export const education = [
  {
    school: 'Islamic University of Technology (IUT)',
    degree: 'B.Sc. in Computer Science and Engineering',
    note: 'Partial scholarship',
    location: 'Bangladesh',
    icon: '🎓',
  },
  {
    school: 'Notre Dame College',
    degree: 'Higher Secondary Certificate (HSC)',
    note: '',
    location: 'Dhaka, Bangladesh',
    icon: '📚',
  },
]

/* ── Projects / Open-source ───────────────────────────────── */

export const projects: Project[] = [
  {
    slug: 'luminous',
    title: 'XDG Desktop Portal Backend for Regolith (luminous)',
    org: 'GSoC 2026 · CCExtractor Development · waycrate/xdg-desktop-portal-luminous',
    period: '2026',
    summary:
      'I built and merged Rust features for wlroots/Wayland desktops: the Background portal, Remote Desktop clipboard sharing, EIS input support, and the portal UI. I also got a memory-corruption fix merged into xdg-desktop-portal itself.',
    description:
      'The largest piece was the Background portal (#199), which tracks whether an app is running in the background using both systemd and Wayland sources, shipped together with its documentation (#202, #203) and adaptive prompt theming (#222). I also built the Remote Desktop clipboard portal (#214), verified two-way between macOS and Linux with Deskflow, and added ConnectToEIS input support for RemoteDesktop (#151), fixing EIS handshake and keymap bugs verified with libei demo tools (#223). Beyond luminous, I found a double-unref bug in xdg-desktop-portal where the same object could be freed twice; the fix and a regression test were merged upstream (#2111). Two larger changes are still in review as of August 2026: a USB portal backend for xdg-desktop-portal-gtk (#545) and ScreenCast v7 audio stream support (#1993, closing #957).',
    tags: ['Rust', 'Wayland', 'zbus/D-Bus', 'systemd', 'calloop/Tokio', 'iced'],
    links: [
      { label: 'GSoC 2026 work product', url: '/gsoc-2026' },
      { label: 'luminous repo', url: 'https://github.com/waycrate/xdg-desktop-portal-luminous' },
      { label: 'Background portal #199', url: 'https://github.com/waycrate/xdg-desktop-portal-luminous/pull/199' },
      { label: 'Clipboard portal #214', url: 'https://github.com/waycrate/xdg-desktop-portal-luminous/pull/214' },
      { label: 'EIS keymap #223', url: 'https://github.com/waycrate/xdg-desktop-portal-luminous/pull/223' },
      { label: 'Double-unref fix #2111', url: 'https://github.com/flatpak/xdg-desktop-portal/pull/2111' },
      { label: 'USB portal (gtk) #545', url: 'https://github.com/flatpak/xdg-desktop-portal-gtk/pull/545' },
      { label: 'ScreenCast audio #1993', url: 'https://github.com/flatpak/xdg-desktop-portal/pull/1993' },
    ],
    refs: {
      '#151': 'https://github.com/waycrate/xdg-desktop-portal-luminous/pull/151',
      '#202': 'https://github.com/waycrate/xdg-desktop-portal-luminous/pull/202',
      '#203': 'https://github.com/waycrate/xdg-desktop-portal-luminous/pull/203',
      '#222': 'https://github.com/waycrate/xdg-desktop-portal-luminous/pull/222',
      '#957': 'https://github.com/flatpak/xdg-desktop-portal/issues/957',
    },
    featured: true,
  },
  {
    slug: 'miniscript-fuzzing',
    title: 'Miniscript Differential Fuzzing & Analysis',
    org: 'Bitcoin ecosystem · 6 implementations',
    period: '2026',
    summary:
      'I reported 24 issues across Miniscript implementations using differential fuzzing and focused analysis, including consensus-invalid scripts being accepted, recursion DoS, and compiler crashes.',
    description:
      'I differential-fuzzed NBitcoin, embit, tinyminiscript, and other implementations, surfacing cases where invalid (including consensus-invalid) scripts were accepted, deeply nested inputs crashed parsers, and checks ran in exponential time. The campaign also uncovered compiler crashes in rust-miniscript and a duplicate-key check in Bitcoin Core that only covered branch 0 (#35629). A maintainer fixed the Derive() stack overflow in NBitcoin (#1321), and two of my own fixes were merged (#1323, #1324). I also contributed an ANTLR4 Miniscript grammar to grammars-v4 (#4923), referenced from rust-miniscript #1007.',
    tags: ['Differential fuzzing', 'Bitcoin', 'Rust', 'C#', 'ANTLR4'],
    links: [
      { label: 'Merged: NBitcoin #1323', url: 'https://github.com/MetacoSA/NBitcoin/pull/1323' },
      { label: 'Merged: NBitcoin #1324', url: 'https://github.com/MetacoSA/NBitcoin/pull/1324' },
      { label: 'ANTLR4 grammar #4923', url: 'https://github.com/antlr/grammars-v4/pull/4923' },
    ],
    issues: [
      { repo: 'rust-bitcoin/rust-miniscript', number: 998, state: 'open', title: '`master_fingerprint()` docs promise `0x00000000` for no-origin keys, but PSBT helpers export synthetic fingerprints instead' },
      { repo: 'rust-bitcoin/rust-miniscript', number: 997, state: 'open', title: 'Concrete-policy compiler entrypoints can abort on large n-of-n threshold lowering instead of returning a normal error' },
      { repo: 'rust-bitcoin/rust-miniscript', number: 996, state: 'closed', title: 'Planner/assets helpers panic on raw no-origin keys with matching fingerprint and non-empty asset path' },
      { repo: 'rust-bitcoin/rust-miniscript', number: 995, state: 'closed', title: '`compile_tr*` panics on recoverable Taproot-construction errors instead of returning normal errors' },
      { repo: 'bitcoin/bitcoin', number: 35629, state: 'open', title: 'Duplicate-key sanity for multipath Miniscript descriptors only checks branch 0, so nonzero-branch key collisions are accepted' },
      { repo: 'MetacoSA/NBitcoin', number: 1325, state: 'open', title: 'Miniscript.Parse accepts type-invalid Miniscript (e.g. `j:0`) and compiles it to a script' },
      { repo: 'MetacoSA/NBitcoin', number: 1322, state: 'closed', title: 'Bare Miniscript multi(...) accepts more than 20 pubkeys and compiles anyway' },
      { repo: 'MetacoSA/NBitcoin', number: 1321, state: 'closed', title: 'Miniscript.Derive() can terminate the process with `StackOverflowException` on deeply nested, parse-valid miniscript' },
      { repo: 'MetacoSA/NBitcoin', number: 1319, state: 'closed', title: 'Bug: rooted HD key descriptors parse and normalize, but script compilation fails with InvalidOperationException' },
      { repo: 'diybitcoinhardware/embit', number: 144, state: 'open', title: 'Miniscript validation accepts consensus invalid and non sane scripts' },
      { repo: 'diybitcoinhardware/embit', number: 143, state: 'open', title: 'Bare Miniscript `andor` / `and_n` with a satisfiable left child passes `verify()` and `compile()`' },
      { repo: 'diybitcoinhardware/embit', number: 142, state: 'open', title: 'Bare Miniscript `multi(k, ...)` with duplicate pubkeys passes `verify()` and `compile()`' },
      { repo: 'diybitcoinhardware/embit', number: 141, state: 'open', title: '`Descriptor.from_string()` accepts invalid or arbitrary descriptor checksum suffixes instead of rejecting them' },
      { repo: 'diybitcoinhardware/embit', number: 140, state: 'open', title: '`Descriptor.from_string()` accepts invalid brace-wrapped single-leaf taptrees like `tr(KEY,{pk(KEY)})`' },
      { repo: 'diybitcoinhardware/embit', number: 139, state: 'open', title: 'Bare Miniscript multi(...) accepts more than 20 pubkeys and compiles anyway' },
      { repo: 'diybitcoinhardware/embit', number: 138, state: 'open', title: 'Exponential-time Miniscript.compile() on shallow nested v: wrappers (algorithmic-complexity DoS)' },
      { repo: 'diybitcoinhardware/embit', number: 137, state: 'open', title: 'Unbounded recursion: deeply nested miniscript raises raw RecursionError across parse, type-check and compile (DoS)' },
      { repo: 'diybitcoinhardware/embit', number: 136, state: 'open', title: '`Descriptor.from_string()` rejects valid mixed multipath descriptors with `DescriptorError: All branches should have the same length`' },
      { repo: 'bitcoinerlab/miniscript', number: 17, state: 'open', title: 'a:/s: wrappers preserve nonZero on W outputs, letting j: accept invalid fragments' },
      { repo: 'bitcoinerlab/miniscript', number: 15, state: 'open', title: 'Empty args in bare Miniscript are silently dropped and canonicalized' },
      { repo: 'bitcoinerlab/miniscript', number: 14, state: 'open', title: 'Bare Miniscript multi(...) accepts more than 20 pubkeys and compiles anyway' },
      { repo: 'bitcoinerlab/miniscript', number: 13, state: 'open', title: 'Malformed multi-colon wrapper syntax such as v:j:multi(...) is accepted and silently canonicalized' },
      { repo: 'bitcoinerlab/miniscript', number: 12, state: 'open', title: 'RangeError: Maximum call stack size exceeded in analyzeNode on deeply nested miniscript' },
      { repo: 'denmeh/tinyminiscript', number: 62, state: 'open', title: 'Exponential time type checking on nested thresh inputs(algorithmic complexity DoS)' },
    ],
    refs: {
      '#1007': 'https://github.com/rust-bitcoin/rust-miniscript/pull/1007',
    },
    featured: true,
  },
  {
    slug: 'bind9-parser-bugs',
    title: 'BIND 9 Parser Bugs',
    org: 'ISC · BIND 9',
    period: '2026',
    summary:
      'I found four configuration inputs that made named or named-checkconf crash, abort, or hang.',
    tags: ['Fuzzing', 'Parsers', 'DNS', 'C'],
    links: [
      { label: 'BIND 9 GitLab', url: 'https://gitlab.isc.org/isc-projects/bind9' },
    ],
    issues: [
      {
        repo: 'isc-projects/bind9',
        number: 6362,
        state: 'closed',
        title:
          'Crash in `named-checkconf` and `named` with invalid `primaries ... key` name in `dns_name_equal()`',
        url: 'https://gitlab.isc.org/isc-projects/bind9/-/work_items/6362',
      },
      {
        repo: 'isc-projects/bind9',
        number: 6363,
        state: 'closed',
        title: 'named-checkconf aborts during teardown: INSIST(isc_mem_inuse(ctx) == 0)',
        url: 'https://gitlab.isc.org/isc-projects/bind9/-/work_items/6363',
      },
      {
        repo: 'isc-projects/bind9',
        number: 6364,
        state: 'closed',
        title: 'Crash in named-checkconf and named with invalid zone name and $/% file clause',
        url: 'https://gitlab.isc.org/isc-projects/bind9/-/work_items/6364',
      },
      {
        repo: 'isc-projects/bind9',
        number: 6367,
        state: 'open',
        title: 'named and named-checkconf hang on a tls token in query-source',
        url: 'https://gitlab.isc.org/isc-projects/bind9/-/work_items/6367',
      },
    ],
  },
  {
    slug: 'tempo-traceql-parser',
    title: 'TraceQL Parser Complexity in Grafana Tempo',
    org: 'Grafana · Tempo',
    period: '2026',
    summary:
      "I found cubic CPU growth during AST construction in Tempo's TraceQL parser.",
    tags: ['Fuzzing', 'Parsers', 'TraceQL', 'Go', 'Algorithmic complexity'],
    links: [{ label: 'Grafana Tempo', url: 'https://github.com/grafana/tempo' }],
    issues: [
      {
        repo: 'grafana/tempo',
        number: 7815,
        state: 'open',
        title: 'TraceQL parser: cubic CPU exhaustion during AST construction',
      },
    ],
  },
  {
    slug: 'llamacpp-gguf',
    title: 'llama.cpp / GGUF Fuzzing',
    org: 'ggml-org / llama.cpp',
    period: '2026',
    summary:
      'I fuzzed GGUF tensor-size calculations and found an integer overflow in block-quantized ggml_nbytes that could read past the end of memory (a heap out-of-bounds read).',
    tags: ['Fuzzing', 'C++', 'Memory safety'],
    links: [
      { label: 'PR #27200', url: 'https://github.com/ggml-org/llama.cpp/pull/27200' },
    ],
  },
  {
    slug: 'october-2026-security-reports',
    title: 'October 2026: BOLT11 Differential Fuzzing & Security Findings',
    org: 'BOLT11, Lightning, Cashu, and payment infrastructure',
    period: 'October 2026',
    summary:
      'The findings included consensus-validation failures, authorization and ownership-validation bypasses, payment disruption and double-payment risks, denial-of-service conditions, and parser correctness failures.',
    tags: ['BOLT11', 'Lightning', 'Cashu'],
    links: [],
    issues: [
      { repo: 'lightningdevkit/rust-lightning', number: 5332, state: 'closed', title: 'Bolt11Invoice reads an amount of 18,446,745 BTC or more without a multiplier as no amount', url: 'https://git.rust-bitcoin.org/lightningdevkit/rust-lightning/issues/5332' },
      { repo: 'alexbosworth/invoices', number: 16, state: 'closed', title: 'U+212A accepted in place of `k` in parsePaymentRequest' },
      { repo: 'alexbosworth/invoices', number: 15, state: 'closed', title: '`parsePaymentRequest` throws `RangeError` on a large `x` expiry' },
      { repo: 'alexbosworth/invoices', number: 14, state: 'closed', title: 'parsePaymentRequest accepts an invoice with no `p` field' },
      { repo: 'alexbosworth/invoices', number: 13, state: 'closed', title: 'parsePaymentRequest accepts payment requests with two `p` fields or two `s` fields' },
      { repo: 'alexbosworth/invoices', number: 12, state: 'closed', title: '`parsePaymentRequest` skips a `p`, `h`, `s` or `n` field with the wrong length' },
      { repo: 'alexbosworth/invoices', number: 11, state: 'closed', title: 'TypeError in parsePaymentRequest on a signature with no recoverable key' },
      { repo: 'gosuda/bitcoin-rs', number: 1728, state: 'closed', title: 'Chainstate accepts a block with 88,000 sigop cost' },
      { repo: 'gosuda/bitcoin-rs', number: 1729, state: 'closed', title: 'Witness-heavy block messages retain 24x wire size as decoded heap' },
      { repo: 'gosuda/bitcoin-rs', number: 1730, state: 'closed', title: 'Full cold revalidation skips scripts for replayed blocks' },
      { repo: 'fiatjaf/pyramid', number: 83, state: 'closed', title: "[fiatjaf.com/nostr] nip61.VerifyNutzap panics on a proof without a DLEQ, which crashes pyramid, reachable by any pubkey in a pyramid relay's web of trust" },
      { repo: 'lawalletio/lawallet-nwc', number: 352, state: 'closed', title: 'NIP-98 checks accept the X-Forwarded-Host and Host request headers as the expected origin, so a token signed for another site is accepted, reachable by any site the user signs in to' },
      { repo: 'btcpayserver/BTCPayServer.Lightning', number: 210, state: 'open', title: 'BOLT11PaymentRequest skips the network prefix check on Signet and Testnet4' },
      { repo: 'btcpayserver/BTCPayServer.Lightning', number: 209, state: 'open', title: 'BOLT11PaymentRequest accepts U+212A KELVIN SIGN in an uppercase invoice' },
      { repo: 'btcpayserver/BTCPayServer.Lightning', number: 208, state: 'open', title: 'BOLT11PaymentRequest.Parse throws IndexOutOfRangeException on a long string with a bad checksum' },
      { repo: 'btcpayserver/BTCPayServer.Lightning', number: 207, state: 'open', title: 'BOLT11PaymentRequest folds the 35-bit timestamp and expiry to 32 bits' },
      { repo: 'btcpayserver/BTCPayServer.Lightning', number: 206, state: 'open', title: 'BOLT11PaymentRequest.VerifySignature returns true for an unrecoverable signature' },
      { repo: 'btcpayserver/BTCPayServer.Lightning', number: 205, state: 'open', title: 'BOLT11PaymentRequest.Parse accepts invoices with a wrong-length field or a missing payment hash' },
      { repo: 'btcpayserver/BTCPayServer.Lightning', number: 203, state: 'closed', title: 'BOLT11PaymentRequest mis-parses amounts in the human-readable part' },
      { repo: 'buildonspark/spark', number: 167, state: 'open', title: 'decodeInvoice does not fail on duplicate BOLT 11 payment_hash fields and keeps the last' },
      { repo: 'buildonspark/spark', number: 166, state: 'open', title: 'decodeInvoice accepts a BOLT 11 signature that is not low-S against the n field' },
      { repo: 'lnbits/bolt11', number: 63, state: 'open', title: '`decode` keeps the first copy of a repeated `p`, `s`, `d` or `h` field instead of raising `Bolt11Exception`' },
      { repo: 'lnbits/bolt11', number: 62, state: 'open', title: '`decode` accepts mixed-case strings and U+212A KELVIN SIGN' },
      { repo: 'lnbits/bolt11', number: 61, state: 'open', title: 'Route hint `fee` and `cltv_expiry_delta` fields decode as signed, and a five-hop hint drops its last hop' },
      { repo: 'lnbits/bolt11', number: 60, state: 'open', title: '`verify_hrp` accepts invalid amounts in the human-readable part' },
      { repo: 'lnbits/bolt11', number: 59, state: 'open', title: '`decode` keeps `p`, `h`, `s` or `n` fields of the wrong length instead of failing' },
      { repo: 'lnbits/bolt11', number: 58, state: 'open', title: '`decode` raises `ValueError`, `ReadError` or `UnicodeDecodeError` instead of `Bolt11Exception`' },
      { repo: 'ACINQ/eclair', number: 3423, state: 'open', title: 'Bolt11Invoice.fromString accepts a leading + in the amount' },
      { repo: 'ACINQ/eclair', number: 3422, state: 'open', title: 'Bolt11Invoice.fromString accepts an invoice with a bech32m checksum' },
      { repo: 'ACINQ/eclair', number: 3421, state: 'open', title: 'Bolt11Invoice.fromString rejects a valid invoice with an unknown fallback-address version' },
      { repo: 'ACINQ/eclair', number: 3418, state: 'open', title: 'Bolt11Invoice.fromString skips p, h and s fields of the wrong length' },
      { repo: 'ACINQ/eclair', number: 3415, state: 'open', title: 'Large x expiry values throw IllegalArgumentException in relativeExpiry or make Bolt11Invoice.fromString reject the invoice' },
      { repo: 'ElementsProject/lightning', number: 9672, state: 'open', title: "A route hint reusing a known short_channel_id changes that channel's CLTV in xpay route finding" },
      { repo: 'ElementsProject/lightning', number: 9671, state: 'open', title: 'bolt11 decode accepts a duplicate p or s field and keeps the first' },
      { repo: 'ElementsProject/lightning', number: 9668, state: 'open', title: 'bolt11 decode accepts a p, h, s or n field of the wrong length' },
      { repo: 'ElementsProject/lightning', number: 9666, state: 'open', title: 'bolt11 decode wraps the amount around u64 for invoices of 2^64 pico-bitcoin or more' },
      { repo: 'bitcoinjs/bolt11', number: 88, state: 'open', title: 'bolt11 encode emits an invoice without a payment secret' },
      { repo: 'bitcoinjs/bolt11', number: 87, state: 'open', title: 'bolt11 decode retains an unknown fallback version' },
      { repo: 'bitcoinjs/bolt11', number: 86, state: 'open', title: 'bolt11 decode accepts a short payment hash' },
      { repo: 'lightningnetwork/lnd', number: 11426, state: 'open', title: 'routerrpc: zero-hop blinded path in a BOLT 11 invoice panics SendPaymentV2 (recovered to an Internal error)', note: 'originally found and reported privately by me' },
      { repo: 'lightningnetwork/lnd', number: 11416, state: 'open', title: '[bug]: ComputeFee wraps a route hint proportional fee that overflows uint64' },
      { repo: 'lightningnetwork/lnd', number: 11415, state: 'open', title: '[bug]: zpay32.Decode wraps an invoice amount that overflows uint64' },
    ],
    privateReports: [
      { project: 'p2poolv2', title: 'A miner could choose its own share difficulty and receive hydrapool payouts without proof of work', url: 'https://github.com/p2poolv2/p2poolv2/commit/0b336c625fe69e20d83f8578148e4d8b2a7b3b2b' },
      { project: 'ngx-l402', title: 'Cashu P2PK mode accepted expired locks, allowing the payer to take the payment back', url: 'https://github.com/ngx-l402/ngx-l402/commit/be747896896bef8921ba60300b323faef73d8235' },
      { project: 'LNbits lndhub', title: 'Settled payments could return HTTP 400 and be paid again when a fresh invoice had an unknown fallback witness version', url: 'https://github.com/lnbits/lndhub/commit/316af646fcf686d2960403748d19841c336345fb' },
      { project: 'lightning-kmp', title: 'Insufficient validation of peer-initiated splices, including locktime, feerate, and funding-contribution checks', url: 'https://github.com/ACINQ/lightning-kmp/commit/9cd577d29448df04d9bae335c9bfda839ec5e69a' },
      { project: 'Eclair', title: 'A trampoline-routing retry bug could forward an HTLC expiring after the HTLC held upstream', url: 'https://github.com/ACINQ/eclair/commit/ff61467a51d45a5aad61ccc304624db1e3a236cb' },
      { project: 'Nutmix', title: 'Blind-auth validation allowed ordinary ecash from the mint to be accepted as blind-auth tokens', url: 'https://github.com/lescuer97/nutmix/commit/d1c1705354babbdf2a8278554e5096cedbc1c11c' },
      { project: 'cashu-ts', title: 'P2PK locktime handling treated a locktime of 0 as permanently locked rather than expired', url: 'https://github.com/cashubtc/cashu-ts/commit/bfc64b30d1a528ed5deac798604a7c57c218554c' },
      { project: 'Nutshell', title: 'A NUT-22 blind-auth bypass involving special characters in the HTTP Host header', url: 'https://github.com/cashubtc/nutshell/commit/7a5a7cee50c06b4de726073931d37aaac95026c7' },
      { project: 'blitzpool', title: 'A P2SH address-ownership bypass that did not require a valid signature verification result', url: 'https://github.com/warioishere/blitzpool-server-rust/commit/cc83669a635f267ceab7b84303e1d7a5c40d7b9f' },
      { project: 'BTCPay Server', title: 'A store-scoped administrator API key could create an unscoped API key', url: 'https://github.com/btcpayserver/btcpayserver/commit/1348bd0579153cf063c2fe240729c9cec4b01e45' },
      { project: 'Nutmix', title: 'A SIG_ALL bypass caused by duplicate tags members being interpreted differently during signature validation', url: 'https://github.com/lescuer97/nutmix/commit/e9a7b75c4beb4d3a748e80ae34597c67d94116fd' },
    ],
  },
]

/* ── Research ─────────────────────────────────────────────── */

export const research: ResearchItem[] = [
  {
    title: 'XVada: Toward Inferring Accurate Context-free Grammars for Big Languages in a Black-box Setting',
    venue: 'arXiv preprint (July 2026)',
    period: '2026',
    authors: 'Mohammad Rifat Arefin, Nuhiat Arefin, Shanto Rahman, Christoph Csallner',
    description:
      'We introduce XVada, a deterministic technique that infers context-free grammars from sample programs using only a black-box parser. Across 17 languages it scales to large languages where earlier tools crash, time out, or lose accuracy, and it beats the strongest competitor (TreeVada) on both grammar accuracy and compactness. Running on Python Liquid, XVada surfaced an infinite loop that can hang the engine (CVE-2026-55865), and fuzzing with the inferred grammar found five more bugs that the Python Liquid developers fixed.',
    tags: ['Grammar inference', 'Black-box fuzzing', 'Python Liquid'],
    links: [{ label: 'arXiv:2607.08959', url: 'https://arxiv.org/abs/2607.08959' }],
    cve: 'CVE-2026-55865',
  },
]

/* ── Achievements ─────────────────────────────────────────── */

export const achievements: Achievement[] = [
  {
    title: 'OpenSats Grantee',
    detail: 'Received Red Team Fund grant for grammar-based fuzzing.',
    year: '2026',
  },
  {
    title: 'CVE-2026-55865',
    detail: 'Credited with a CVE for an infinite-loop hang in Python Liquid, found via grammar-based fuzzing.',
    year: '2026',
  },
  {
    title: 'GSoC 2026 Contributor',
    detail: 'Selected contributor with CCExtractor Development: XDG portal backend for Regolith (luminous), in Rust.',
    year: '2026',
  },
  {
    title: 'Memory-corruption fix merged in xdg-desktop-portal',
    detail: 'Double-unref bug in screencast options handling; fix and regression test merged upstream (#2111).',
    year: '2026',
  },
  {
    title: '24 Miniscript issues reported',
    detail: 'Across multiple implementations, with merged fixes in NBitcoin and rust-miniscript.',
    year: '2026',
  },
  {
    title: 'Bangladesh Math Olympiad (national level)',
    detail: 'Advanced through several rounds to compete at the national level; also completed Art of Problem Solving courses in Number Theory and Counting & Probability.',
    year: '',
  },
  {
    title: 'Partial scholarship',
    detail: 'B.Sc. in Computer Science and Engineering at IUT.',
    year: '',
  },
]

/* ── Skills ───────────────────────────────────────────────── */

export const skills: SkillGroup[] = [
  {
    name: 'Programming',
    items: ['Rust', 'Go', 'C/C++', 'Python', 'Bash'],
  },
  {
    name: 'Fuzzing & Testing',
    items: [
      'Grammar-based fuzzing',
      'Differential testing',
      'AFL++',
      'LibAFL',
      'Nautilus',
      'Sanitizers',
      'Crash minimization',
      'Regression tests',
    ],
  },
  {
    name: 'Systems & Tools',
    items: ['Linux', 'Container runtimes', 'OCI', 'Wayland', 'D-Bus', 'systemd', 'Git', 'CI'],
  },
]
