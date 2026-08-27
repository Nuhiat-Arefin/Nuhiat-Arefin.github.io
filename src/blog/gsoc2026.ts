/**
 * Blog post: "My GSoC 2026 Experience"
 * ─────────────────────────────────────────────────────────────
 * Rendered at /blog/gsoc-2026-xdg-desktop-portals
 * Edit the blocks below to personalize the story.
 * Block types: 'p' | 'h2' | 'h3' | 'quote' | 'list' | 'code' | 'image'
 * Inline links in 'p' text use [label](url).
 */

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | {
      type: 'pr-table'
      rows: Array<{
        repo: string
        number: number
        title: string
        url: string
        status: 'Merged' | 'Pending Review' | 'In Discussion'
      }>
    }

export interface Post {
  slug: string
  title: string
  subtitle: string
  date?: string
  readingTime: string
  tags: string[]
  blocks: PostBlock[]
}

export const gsocPost: Post = {
  slug: 'gsoc-2026-xdg-desktop-portals',
  title: 'GSoC 2026: Expanding XDG Desktop Portal Support',
  subtitle:
    'I spent the summer bringing Background and Clipboard portals to wlroots desktops, polishing the dialogs, getting EIS working, and sending fixes and API proposals upstream.',
  readingTime: '12 min read',
  tags: ['GSoC', 'Rust', 'Wayland', 'Open Source'],
  blocks: [
    {
      type: 'p',
      text: "GSoC 2026 is almost over, so here's the write-up I owe the internet. I spent the summer with CCExtractor Development (mentor: Soumya Ranjan Patnaik) working on [luminous](https://github.com/waycrate/xdg-desktop-portal-luminous), an XDG Desktop Portal backend for Regolith and other wlroots-based Wayland desktops. In Rust.",
    },
    {
      type: 'p',
      text: "Quick context if portals mean nothing to you: they let sandboxed applications ask before accessing resources such as your screen, clipboard, or USB devices. If you have shared your screen on Wayland and seen a permission prompt, you have used one. My summer was mostly about filling those gaps for wlroots users. I added Background and Clipboard portal support, then opened two upstream PRs: one to bring USB support to xdg-desktop-portal-gtk, and another to let ScreenCast sessions include audio. Both are still open today.",
    },
    { type: 'h2', text: 'Why wlroots desktops needed broader portal support' },
    {
      type: 'p',
      text: "Portal coverage on wlroots desktops has been limited. xdg-desktop-portal-wlr intentionally focuses on Screenshot and ScreenCast, while other interfaces commonly fall back to xdg-desktop-portal-gtk. That leaves gaps for requests such as background status and clipboard access. Real applications depend on those answers: Pika Backup documents scheduled-backup failures when the Background portal is missing, EasyEffects users have reported audio stopping after its window closes, and Epiphany web apps also request background access through the portal.",
    },
    {
      type: 'p',
      text: "xdg-desktop-portal-luminous is written in Rust. My work used zbus for D-Bus, calloop and Tokio for the event loops, iced on Wayland layer shell for the dialogs, and reis for emulated input.",
    },
    { type: 'h2', text: 'Combining systemd and Wayland state' },
    {
      type: 'p',
      text: "The Background portal reports which applications continue running without a visible window. No single system component has all the state needed to answer that.",
    },
    {
      type: 'p',
      text: "So the implementation that merged ([PR #199](https://github.com/waycrate/xdg-desktop-portal-luminous/pull/199)) asks two sources and merges the answers. From systemd: a zbus proxy watches UnitNew and UnitRemoved signals for transient app scopes (the app-flatpak-<app-id>-<suffix>.scope ones), with a small parser that validates the suffix before trusting the app ID inside it. From Wayland: libwayshot's ext-foreign-toplevel list shows which apps actually have windows. Then you take the maximum state. Scope but no window? Background. Window shows up? Running. We never report Active, because the toplevel list tells you an app exists, not that it's focused.",
    },
    {
      type: 'image',
      src: '/blog/diagram-background.svg',
      alt: 'Diagram: systemd app scopes and the Wayland toplevel list feed into a merge that takes the maximum state, producing the portal Background or Running state, never Active',
      caption: 'systemd and Wayland state are merged before the portal reports an application state.',
    },
    {
      type: 'p',
      text: "Sandboxed apps don't always use the same ID on both sides, so the merge compares the last ID token, normalized: com.github.wwmm.easyeffects and org.kde.easyeffects end up as the same app, with a guard so two apps sharing a token never get mixed up. Concurrent NotifyBackground requests each get their own oneshot reply channel, share one prompt per app, reject duplicate handles, and honor Request.Close cancellation. EnableAutostart writes real XDG autostart .desktop entries: correct escaping, the X-Flatpak key, proper respect for XDG_CONFIG_HOME. And if systemd or Wayland isn't there, the portal just returns what it has instead of erroring out.",
    },
    {
      type: 'p',
      text: "Review caught real things. I'd hardcoded the configuration directory instead of resolving XDG_CONFIG_HOME. Fixed. My hand-written desktop-entry writer got an approving 'maybe there will be a crate for it. But still well done!', which I'm framing. I also documented the interface and autostart behavior for packagers and application developers in [PR #202](https://github.com/waycrate/xdg-desktop-portal-luminous/pull/202) and [PR #203](https://github.com/waycrate/xdg-desktop-portal-luminous/pull/203).",
    },
    { type: 'h2', text: 'Bridging Tokio and calloop' },
    {
      type: 'p',
      text: "This was the hardest thing I built all summer. My proposal said it would be, and for once the proposal was right. The Clipboard portal lets RemoteDesktop sessions share clipboard data. Its implementation connects the Tokio runtime serving D-Bus with a calloop Wayland event loop running on a separate thread.",
    },
    {
      type: 'p',
      text: "What merged ([PR #214](https://github.com/waycrate/xdg-desktop-portal-luminous/pull/214), on the modern ext_data_control_manager_v1 protocol) works like this. Nothing happens until a client calls RequestClipboard before the session starts. A clipboard_requested flag enforces that, so sessions the user never approved never allocate anything. D-Bus requests cross to the Wayland thread over a bounded calloop sync_channel, so the Wayland loop wakes as a native event source, no polling. Transfer events and ownership changes flow back to Tokio over mpsc and watch channels, oneshot channels carry per-request replies, and serial numbers track transfers still in flight.",
    },
    {
      type: 'image',
      src: '/blog/diagram-clipboard.svg',
      alt: 'Diagram: D-Bus requests cross from the Tokio runtime to the Wayland calloop thread over a bounded sync_channel, while events, ownership changes and oneshot replies flow back over mpsc and watch channels',
      caption: 'Requests cross one way; events and replies flow back the other.',
    },
    {
      type: 'p',
      text: "The fun test was two-way clipboard sharing between macOS and Linux over Deskflow. Copy on one machine, watch it show up on the other. One lesson from testing, in case you try this at home: the latest Deskflow release and libportal 0.9.x built without clipboard portal support, so I ran Deskflow built from master against libportal 0.10. When it finally worked in both directions, I just sat there copying text back and forth like a child.",
    },
    { type: 'h2', text: 'Upstream: USB devices and screencast audio, for everyone' },
    {
      type: 'p',
      text: "The Usb portal landed in [xdg-desktop-portal 1.19.1](https://github.com/flatpak/xdg-desktop-portal/releases/tag/1.19.1), but xdg-desktop-portal-gtk had not implemented it. My PR adapts the xdg-desktop-portal-gnome code and ports the dialog to GTK3: a GtkDialog listing the requested devices, all-or-nothing approval, and no new dependencies. It is still open today as xdg-desktop-portal-gtk [PR #545](https://github.com/flatpak/xdg-desktop-portal-gtk/pull/545).",
    },
    {
      type: 'p',
      text: "The ScreenCast work is the one with the widest reach. Until this lands, there is no standard way to ask for audio alongside video in a screencast. The upstream issue asking for that ([#957](https://github.com/flatpak/xdg-desktop-portal/issues/957)) was filed years ago, and Discord, OBS Studio, and friends have been stuck with workarounds the whole time. My PR bumps the ScreenCast interface to version 7: an audio option in SelectSources, multiple streams per source, each stream tagged with a media_type of \"video\" or \"audio\". There's gating that strips the new option for backends older than v7, so old backends never see something they don't understand. The media still flows through PipeWire. This change is purely about the API shape and backward compatibility.",
    },
    {
      type: 'p',
      text: "The ScreenCast PR is still open today as xdg-desktop-portal [PR #1993](https://github.com/flatpak/xdg-desktop-portal/pull/1993), and the review discussion has been what I hoped for when I filed it. Maintainers have pushed on corner cases, including whether every backend should choose the audio stream and whether one audio stream per video stream would be simpler for API consumers. Another contributor is already prototyping the GNOME and KDE backend sides. I'm keeping this one alive after GSoC ends.",
    },
    { type: 'h2', text: 'Redesigning the portal dialogs' },
    {
      type: 'p',
      text: "Portal dialogs are security UI: they are where someone decides whether an application can access the screen. The old dialogs were bare, undecorated layer-shell windows with a cramped footer and little visual hierarchy. Hardcoded margins also caused the screencast dialog to appear tiny and empty on a 1366x768 display, as reported in [issue #215](https://github.com/waycrate/xdg-desktop-portal-luminous/issues/215). I redesigned the dialogs in [PR #218](https://github.com/waycrate/xdg-desktop-portal-luminous/pull/218). A reviewer expected the new layout to address #215, which is still open today. [PR #222](https://github.com/waycrate/xdg-desktop-portal-luminous/pull/222) then added automatic light and dark theme selection. Small thing, but I use this desktop too.",
    },
    { type: 'h3', text: 'The screen-sharing chooser' },
    {
      type: 'image',
      src: '/blog/dialog-old.jpeg',
      alt: 'The old screen-sharing dialog: a sparse undecorated window with oversized previews and a raw use_cursor checkbox',
      caption: 'Before: the old screen-sharing dialog. Bare window, raw checkbox label, no visual hierarchy.',
    },
    {
      type: 'image',
      src: '/blog/dialog-new-light.jpeg',
      alt: 'The redesigned screen-sharing dialog in light mode: titled header, tab switcher, tidy preview cards, and a right-aligned action row',
      caption: 'After (PR #218): titled header, tidy preview cards, proper footer with a right-aligned action row.',
    },
    {
      type: 'image',
      src: '/blog/dialog-new-dark.jpeg',
      alt: 'The redesigned screen-sharing dialog in dark mode',
      caption: 'Same dialog in dark mode (PR #222). It follows the system preference automatically.',
    },
    {
      type: 'image',
      src: '/blog/dialog-window-tab.png',
      alt: 'The Window tab of the redesigned dialog: a scrolling grid of live window previews, each labeled with its app ID and window title',
      caption: 'The Window tab with 7 windows open: every window gets a live preview, its app ID, and its title, in a grid that scrolls instead of overflowing.',
    },
    { type: 'h3', text: 'The permission prompt' },
    {
      type: 'image',
      src: '/blog/dialog-shot-old.jpeg',
      alt: 'The old screenshot permission dialog: bare text asking to allow a screenshot, with plain No and Yes buttons',
      caption: 'The old screenshot prompt: no padding, no hierarchy, and a literal No/Yes for a permission decision.',
    },
    {
      type: 'image',
      src: '/blog/dialog-shot-light.jpeg',
      alt: 'The redesigned screenshot permission dialog in light mode: the question on a padded panel, a footer rule, then a quiet Deny beside a primary Allow',
      caption: 'Same question, new frame: padded panel, footer rule, and a quiet Deny next to a primary Allow.',
    },
    {
      type: 'image',
      src: '/blog/dialog-shot-dark.jpeg',
      alt: 'The redesigned screenshot permission dialog in dark mode',
      caption: 'And the same prompt in dark mode.',
    },
    { type: 'h2', text: 'A double-unref bug in xdg-desktop-portal' },
    {
      type: 'p',
      text: "I come from fuzzing, so even while building features, I read surrounding code for how it breaks. That's how I found a double-unref bug in xdg-desktop-portal: persistence isn't allowed on RemoteDesktop sessions, but when a request asked for it anyway, the portal's rejection path could unref the same GVariant twice. A second unref on freed memory means undefined behavior (GLib criticals, heap corruption, crashes, the works) in a process that every Flatpak app talks to.",
    },
    {
      type: 'quote',
      text: 'I found this by reading past the code I was there to change. One invalid ScreenCast request could make two owners release the same GVariant and crash the portal.',
    },
    {
      type: 'p',
      text: "I sent the fix as [PR #2111](https://github.com/flatpak/xdg-desktop-portal/pull/2111). The maintainer's first reaction was \"Good catch!\". And then the review turned into the good kind of back-and-forth. He proposed a different fix using g_steal_pointer, I reworked the patch his way, and then he came back with \"Sorry to send you on a detour… you got it right the first time around\" and switched it back, keeping only my comment. He even filed a follow-up PR ([#2114](https://github.com/flatpak/xdg-desktop-portal/pull/2114)) to clean up the confusing helper API that made the bug possible in the first place.",
    },
    {
      type: 'p',
      text: "The production fix is one ownership-transfer line. The regression test has two parameterized cases: one sends a persist_mode, the other a restore_token. Both are persistence requests, so each must return InvalidArgument without calling the backend's SelectSources method. The test then reads the interface version to prove that the portal remains responsive.",
    },
    { type: 'h2', text: 'Why InputCapture still needs compositor support' },
    {
      type: 'p',
      text: "Working on Remote Desktop and EIS input made one gap obvious. The InputCapture portal, which lets Deskflow or Synergy move your cursor between machines, is only as good as the compositor under it. KWin ([MR 5742](https://invent.kde.org/plasma/kwin/-/merge_requests/5742)) and Mutter ([MR 2628](https://gitlab.gnome.org/GNOME/mutter/-/merge_requests/2628)) both expose physical input events over EIS. When a cursor reaches a registered barrier, the compositor redirects physical events to the portal client through libeis and releases them when requested. On the wlroots side, there was no equivalent path.",
    },
    {
      type: 'p',
      text: "The portal-facing InputCapture methods were already there: CreateSession, GetZones, SetPointerBarriers, ConnectToEIS, Enable and Disable, plus the Activated and Deactivated signals. The backend still could not capture physical input. Barriers were validated and stored but not enforced, Release was missing, and nothing on the compositor side forwarded physical events. The maintainer summarized the limitation in the [PR #223 discussion](https://github.com/waycrate/xdg-desktop-portal-luminous/pull/223): even if Deskflow connects to the EIS socket, it cannot operate without pointer-motion data from the compositor.",
    },
    {
      type: 'p',
      text: "The EIS groundwork underneath it is mine, at least. [PR #151](https://github.com/waycrate/xdg-desktop-portal-luminous/pull/151) implemented ConnectToEIS for the RemoteDesktop path, adapted from reis's demo server. [PR #223](https://github.com/waycrate/xdg-desktop-portal-luminous/pull/223) fixed two bugs that made it unusable from master: a tokio::spawn inside a plain std::thread, which killed the input-forwarding thread on the very first EIS event, and ConnectToEIS handing callers a duplicate of the listening socket, which no libei client can handshake on. It also finally sent the keymap; without it, even reis's own type-text example can't run. I verified the fixes with libei's oeffis-demo-tool and ei-demo-client.",
    },
    {
      type: 'image',
      src: '/blog/diagram-inputcapture.svg',
      alt: 'Diagram: Deskflow or Synergy talk to the InputCapture portal over D-Bus, but the dashed EIS link that should carry physical events from the compositor is missing on sway',
      caption: 'The portal half exists. The compositor half is the missing link.',
    },
    {
      type: 'p',
      text: "My next step is compositor-side EIS input capture for Sway, modeled on the KWin and Mutter work. That would provide the physical event source that the InputCapture implementation currently lacks.",
    },
    { type: 'h2', text: 'Last piece: getting it into users’ hands' },
    {
      type: 'p',
      text: "The final stretch of work was distribution. I prepared Debian packaging in my xdg-desktop-portal-luminous fork and opened four PRs to integrate it with Regolith. All four are still open today. [voulage #163](https://github.com/regolith-linux/voulage/pull/163) adds the xdg-desktop-portal-luminous package model to Regolith's packaging automation and remains a draft. [xdg-desktop-portal-regolith #30](https://github.com/regolith-linux/xdg-desktop-portal-regolith/pull/30) and [#31](https://github.com/regolith-linux/xdg-desktop-portal-regolith/pull/31) make Regolith's portal configuration prefer xdg-desktop-portal-luminous in Wayland sessions. [regolith-wm-config #59](https://github.com/regolith-linux/regolith-wm-config/pull/59) recommends the package for Sway sessions.",
    },
    { type: 'h2', text: 'What’s next' },
    {
      type: 'p',
      text: "I plan to continue the Sway input-capture work and follow through on the USB and ScreenCast PRs, both of which are still open today. I will also stay involved with the Waycrate and Regolith communities through triage, review, and further contributions.",
    },
    {
      type: 'p',
      text: "Closer to home, I want to help more students in Bangladesh enter open source through university workshops and support for their first contributions. I will also continue my grammar-based fuzzing research.",
    },
    { type: 'h2', text: 'Thank you' },
    {
      type: 'p',
      text: "This summer exists because CCExtractor Development took a chance on a student from Bangladesh, and because Soumya Ranjan Patnaik is exactly the mentor I needed. He gave me solid ideas when I was stuck, answered every question I brought him, and patiently cleared up my confusion about how all these pieces fit together. He trusted me with big parts of the project and let me own them. None of the work above happens without that guidance. Thank you, Soumya.",
    },
    { type: 'h2', text: 'Status of raised PRs as of August 29, 2026' },
    {
      type: 'pr-table',
      rows: [
        {
          repo: 'waycrate/xdg-desktop-portal-luminous',
          number: 199,
          title: 'Implement Background Portal',
          url: 'https://github.com/waycrate/xdg-desktop-portal-luminous/pull/199',
          status: 'Merged',
        },
        {
          repo: 'waycrate/xdg-desktop-portal-luminous',
          number: 202,
          title: 'Document Background Portal Interface',
          url: 'https://github.com/waycrate/xdg-desktop-portal-luminous/pull/202',
          status: 'Merged',
        },
        {
          repo: 'waycrate/xdg-desktop-portal-luminous',
          number: 203,
          title: 'Document Background Autostart Requirements',
          url: 'https://github.com/waycrate/xdg-desktop-portal-luminous/pull/203',
          status: 'Merged',
        },
        {
          repo: 'waycrate/xdg-desktop-portal-luminous',
          number: 214,
          title: 'Implement Clipboard Portal for RemoteDesktop Sessions',
          url: 'https://github.com/waycrate/xdg-desktop-portal-luminous/pull/214',
          status: 'Merged',
        },
        {
          repo: 'waycrate/xdg-desktop-portal-luminous',
          number: 218,
          title: 'Enhance UI',
          url: 'https://github.com/waycrate/xdg-desktop-portal-luminous/pull/218',
          status: 'Merged',
        },
        {
          repo: 'waycrate/xdg-desktop-portal-luminous',
          number: 222,
          title: 'Enhance Background prompt UI and automatic theme switching',
          url: 'https://github.com/waycrate/xdg-desktop-portal-luminous/pull/222',
          status: 'Merged',
        },
        {
          repo: 'waycrate/xdg-desktop-portal-luminous',
          number: 223,
          title: 'Send EIS Keymap',
          url: 'https://github.com/waycrate/xdg-desktop-portal-luminous/pull/223',
          status: 'Merged',
        },
        {
          repo: 'flatpak/xdg-desktop-portal',
          number: 2111,
          title: 'screencast: Fix options double-unref on invalid persistence',
          url: 'https://github.com/flatpak/xdg-desktop-portal/pull/2111',
          status: 'Merged',
        },
        {
          repo: 'flatpak/xdg-desktop-portal-gtk',
          number: 545,
          title: 'Implement USB portal backend',
          url: 'https://github.com/flatpak/xdg-desktop-portal-gtk/pull/545',
          status: 'Pending Review',
        },
        {
          repo: 'flatpak/xdg-desktop-portal',
          number: 1993,
          title: 'ScreenCast: Add audio stream support',
          url: 'https://github.com/flatpak/xdg-desktop-portal/pull/1993',
          status: 'In Discussion',
        },
        {
          repo: 'regolith-linux/voulage',
          number: 163,
          title: 'chore: add xdg-desktop-portal-luminous package models',
          url: 'https://github.com/regolith-linux/voulage/pull/163',
          status: 'Pending Review',
        },
        {
          repo: 'regolith-linux/xdg-desktop-portal-regolith',
          number: 30,
          title: 'feat: prefer luminous for Wayland portals',
          url: 'https://github.com/regolith-linux/xdg-desktop-portal-regolith/pull/30',
          status: 'Pending Review',
        },
        {
          repo: 'regolith-linux/xdg-desktop-portal-regolith',
          number: 31,
          title: 'feat: prefer luminous for Noble Wayland portals',
          url: 'https://github.com/regolith-linux/xdg-desktop-portal-regolith/pull/31',
          status: 'Pending Review',
        },
        {
          repo: 'regolith-linux/regolith-wm-config',
          number: 59,
          title: 'feat: recommend luminous for Sway sessions',
          url: 'https://github.com/regolith-linux/regolith-wm-config/pull/59',
          status: 'Pending Review',
        },
      ],
    },
  ],
}
