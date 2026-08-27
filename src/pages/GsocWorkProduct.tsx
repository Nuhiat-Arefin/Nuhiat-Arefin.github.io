import { useEffect } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, ArrowUpRight, CheckCircle2, CircleDot } from 'lucide-react'
import { identity } from '../config'

/**
 * GSoC 2026 Final Work Product page.
 * Structure follows the official Work Product Submission Guidelines:
 * goals → what was done → merged/not merged upstream → current state →
 * what's left → challenges & lessons learned.
 */

interface PrEntry {
  repo: string
  number: number
  title: string
  status: 'merged' | 'open'
}

const luminousPrs: PrEntry[] = [
  { repo: 'waycrate/xdg-desktop-portal-luminous', number: 148, title: 'Adding Permission Dialog', status: 'merged' },
  { repo: 'waycrate/xdg-desktop-portal-luminous', number: 151, title: 'Implement ConnectToEIS', status: 'merged' },
  { repo: 'waycrate/xdg-desktop-portal-luminous', number: 199, title: 'Implement Background Portal', status: 'merged' },
  { repo: 'waycrate/xdg-desktop-portal-luminous', number: 202, title: 'Document Background Portal Interface', status: 'merged' },
  { repo: 'waycrate/xdg-desktop-portal-luminous', number: 203, title: 'Document Background Autostart Requirements', status: 'merged' },
  { repo: 'waycrate/xdg-desktop-portal-luminous', number: 214, title: 'Implement Clipboard Portal for RemoteDesktop Sessions', status: 'merged' },
  { repo: 'waycrate/xdg-desktop-portal-luminous', number: 218, title: 'Enhance UI', status: 'merged' },
  { repo: 'waycrate/xdg-desktop-portal-luminous', number: 222, title: 'Enhance Background prompt UI and automatic theme switching', status: 'merged' },
  { repo: 'waycrate/xdg-desktop-portal-luminous', number: 223, title: 'Send EIS Keymap', status: 'merged' },
]

const upstreamPrs: PrEntry[] = [
  { repo: 'flatpak/xdg-desktop-portal', number: 2111, title: 'screencast: Fix options double-unref on invalid persistence (fix + regression test)', status: 'merged' },
  { repo: 'flatpak/xdg-desktop-portal-gtk', number: 545, title: 'Implement USB portal backend', status: 'open' },
  { repo: 'flatpak/xdg-desktop-portal', number: 1993, title: 'ScreenCast: Add audio stream support', status: 'open' },
]

function prUrl(e: PrEntry) {
  return `https://github.com/${e.repo}/pull/${e.number}`
}

function PrTable({ entries }: { entries: PrEntry[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left font-mono-code text-xs uppercase tracking-widest text-muted-foreground">
            <th className="py-2 pr-4 font-medium">PR</th>
            <th className="py-2 pr-4 font-medium">Description</th>
            <th className="py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.number} className="border-b border-border/60">
              <td className="py-2.5 pr-4 whitespace-nowrap">
                <a
                  href={prUrl(e)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 link-underline"
                >
                  #{e.number} <ArrowUpRight className="h-3 w-3" />
                </a>
              </td>
              <td className="py-2.5 pr-4 text-foreground/80">{e.title}</td>
              <td className="py-2.5 whitespace-nowrap">
                {e.status === 'merged' ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" /> merged
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-amber-700">
                    <CircleDot className="h-3.5 w-3.5" /> open
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="font-serif-display text-2xl font-semibold tracking-tight">{children}</h2>
  )
}

export default function GsocWorkProduct() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `GSoC 2026 Final Work Product · ${identity.name}`
    return () => {
      document.title = `${identity.name} · Security Researcher & Open-Source Contributor`
    }
  }, [])

  return (
    <main className="mx-auto max-w-[720px] px-6 pb-24">
      <div className="pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>
      </div>

      <header className="border-b border-border pt-12 pb-10">
        <p className="font-mono-code text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Google Summer of Code 2026 · Final Work Product
        </p>
        <h1 className="font-serif-display mt-4 text-4xl font-bold leading-[1.15] tracking-tight">
          An XDG Desktop Portal backend for wlroots-based Wayland desktops
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Contributor: {identity.name} (
          <a href={identity.github} target="_blank" rel="noreferrer" className="link-underline">
            github.com/{identity.handle}
          </a>
          ) · Organization: CCExtractor Development · Mentor: Soumya Ranjan Patnaik · Large
          project, 12 weeks · Project repository:{' '}
          <a
            href="https://github.com/waycrate/xdg-desktop-portal-luminous"
            target="_blank"
            rel="noreferrer"
            className="link-underline"
          >
            waycrate/xdg-desktop-portal-luminous
          </a>
        </p>
      </header>

      {/* 1 ─ Goals */}
      <section className="mt-10">
        <SectionHeading>Project goals</SectionHeading>
        <div className="prose-portfolio mt-4 space-y-4">
          <p>
            XDG desktop portals are the permission brokers of modern Linux desktops: sandboxed
            applications cannot directly grab the screen, clipboard, or USB devices. They ask the
            portal, and the portal asks the user. Tiling window managers and wlroots-based desktops
            like Regolith lacked a complete portal backend, leaving sandboxed apps broken.
          </p>
          <p>
            The proposal set two primary goals. <strong>For Regolith/wlroots</strong>: deliver
            native implementations of the complex Background and Clipboard portals in{' '}
            <span className="font-mono-code text-[15px]">xdg-desktop-portal-luminous</span> (a Rust
            backend using zbus, calloop/Tokio, systemd, and iced), closing a major feature gap for
            sandboxed applications. <strong>For the upstream ecosystem</strong>: implement the
            missing Usb portal in xdg-desktop-portal-gtk, and help define and implement a new
            ScreenCast API with audio support in the xdg-desktop-portal frontend, a critical
            feature for apps like Discord and OBS Studio.
          </p>
        </div>

        <h3 className="mt-8 font-mono-code text-xs uppercase tracking-widest text-muted-foreground">
          Deliverables vs. proposal
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left font-mono-code text-xs uppercase tracking-widest text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Promised deliverable</th>
                <th className="py-2 font-medium">Outcome</th>
              </tr>
            </thead>
            <tbody className="text-foreground/80">
              <tr className="border-b border-border/60">
                <td className="py-2.5 pr-4">Background portal (systemd + Wayland tracking, permission UI, docs)</td>
                <td className="py-2.5">
                  <span className="inline-flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" /> delivered & merged
                  </span>{' '}
                  (luminous #199, theming #222, docs #202/#203)
                </td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2.5 pr-4">Clipboard portal for RemoteDesktop sessions</td>
                <td className="py-2.5">
                  <span className="inline-flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" /> delivered & merged
                  </span>{' '}
                  (luminous #214; EIS input support #151, #223)
                </td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2.5 pr-4">Usb portal in xdg-desktop-portal-gtk (GTK3 dialog)</td>
                <td className="py-2.5">
                  <span className="inline-flex items-center gap-1.5 text-amber-700">
                    <CircleDot className="h-3.5 w-3.5" /> implemented, PR open
                  </span>{' '}
                  (xdg-desktop-portal-gtk #545)
                </td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2.5 pr-4">ScreenCast API with audio support (frontend)</td>
                <td className="py-2.5">
                  <span className="inline-flex items-center gap-1.5 text-amber-700">
                    <CircleDot className="h-3.5 w-3.5" /> implemented, PR open
                  </span>{' '}
                  (xdg-desktop-portal #1993)
                </td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2.5 pr-4">UI/UX polish for portal dialogs</td>
                <td className="py-2.5">
                  <span className="inline-flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" /> delivered & merged
                  </span>{' '}
                  (luminous #218, #222, adaptive theming)
                </td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2.5 pr-4">Debian packaging & CI publishing via Regolith APT</td>
                <td className="py-2.5">
                  <span className="inline-flex items-center gap-1.5 text-amber-700">
                    <CircleDot className="h-3.5 w-3.5" /> in progress, PRs open
                  </span>{' '}
                  (packaging work on my luminous fork: debian/ metadata + release/publish CI;
                  voulage #163 (draft); portal priority in xdg-desktop-portal-regolith #30/#31; Sway
                  recommendation in regolith-wm-config #59)
                </td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4">(Unplanned) Security fix in xdg-desktop-portal</td>
                <td className="py-2.5">
                  <span className="inline-flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" /> found, fixed & merged
                  </span>{' '}
                  (double-unref memory-corruption fix + regression test, #2111; maintainer follow-up
                  #2114)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2 ─ What I did */}
      <section className="mt-12">
        <SectionHeading>What I did</SectionHeading>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-foreground/80">
          <li>
            <strong>Background portal</strong>: dual-source state tracking (merged as #199): a
            zbus proxy subscribes to systemd's UnitNew/UnitRemoved signals for transient app scopes
            (app-flatpak-&lt;app-id&gt;-&lt;suffix&gt;.scope, with generated-suffix validation),
            while libwayshot's ext-foreign-toplevel list provides window visibility; a normalized
            final-token match reconciles differing IDs (e.g. com.github.wwmm.easyeffects vs
            org.kde.easyeffects). Concurrent NotifyBackground requests use per-request oneshot
            reply channels and coalesce behind one prompt per app; EnableAutostart writes XDG
            autostart .desktop entries (verified end-to-end with SyncThingy, #203). Includes
            adaptive prompt theming (#222) and interface/autostart documentation (#202, #203).
          </li>
          <li>
            <strong>Remote Desktop clipboard sharing</strong>: activation gated by a
            clipboard_requested flag (RequestClipboard before Start), with D-Bus → Wayland commands
            over a bounded calloop sync_channel and Wayland → D-Bus transfer/ownership events over
            tokio mpsc and watch channels, oneshot per-request replies, and serial-tracked FD
            transfers (merged as #214). Built on ext_data_control_manager_v1; validated two-way
            between macOS and Linux with Deskflow (at the time, this required Deskflow built from
            master and libportal ≥ 0.10). EIS input support: ConnectToEIS (#151), plus handshake
            and keymap fixes verified with libei's demo tools (#223).
          </li>
          <li>
            <strong>Usb portal for xdg-desktop-portal-gtk</strong>: implemented by adapting
            xdg-desktop-portal-gnome's code with the dialog ported to GTK3 (GtkDialog + GtkListBox,
            all-or-nothing approve/deny matching GNOME's behavior); +983 lines across 13 files, CI
            green at submission, open as #545.
          </li>
          <li>
            <strong>ScreenCast API with audio</strong>: bumps the ScreenCast interface to version
            7: an audio option in SelectSources, multiple streams per source with a media_type
            property, and gating that strips the option for pre-v7 backends; PipeWire remains the
            transport. Closes the long-standing issue #957; open as #1993, under active maintainer
            review.
          </li>
          <li>
            <strong>Portal UI overhaul</strong>: shared dialog design system (Header / Content /
            Footer layout, styled right-aligned actions, centered panels replacing bare
            layer-shell windows) and automatic theme adaptation (merged as #218, #222).
          </li>
          <li>
            <strong>Upstream security fix</strong>: found and fixed a double-unref
            memory-corruption bug in the cross-desktop xdg-desktop-portal screencast
            implementation, with a regression test (#2111, details below).
          </li>
        </ul>
      </section>

      {/* 3 ─ Merged upstream */}
      <section className="mt-12">
        <SectionHeading>What code got merged (or not) upstream</SectionHeading>
        <p className="mt-3 text-[15px] text-foreground/75">
          All nine project pull requests were merged into the luminous repository. Upstream in the
          flatpak portal ecosystem, my memory-corruption fix is merged; two larger feature PRs are
          open and under review.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          PR statuses on this page are as of August 24, 2026; the linked PRs have the current
          state.
        </p>
        <h3 className="mt-6 font-mono-code text-xs uppercase tracking-widest text-muted-foreground">
          waycrate/xdg-desktop-portal-luminous: project repository
        </h3>
        <div className="mt-3">
          <PrTable entries={luminousPrs} />
        </div>
        <h3 className="mt-8 font-mono-code text-xs uppercase tracking-widest text-muted-foreground">
          flatpak/xdg-desktop-portal ecosystem: upstream
        </h3>
        <div className="mt-3">
          <PrTable entries={upstreamPrs} />
        </div>
        <p className="mt-4 text-[15px] leading-7 text-foreground/75">
          Related ecosystem contribution:{' '}
          <a
            href="https://github.com/waycrate/wayshot/pull/290"
            target="_blank"
            rel="noreferrer"
            className="link-underline"
          >
            waycrate/wayshot #290
          </a>{' '}
          (merged): build the screenshot image buffer without an extra clone.
        </p>
      </section>

      {/* 4 ─ Current state */}
      <section className="mt-12">
        <SectionHeading>Current state</SectionHeading>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-foreground/80">
          <li>
            All GSoC-scoped luminous features are <strong>merged, documented, and ready to use</strong>:
            Background portal with permission UI, Remote Desktop clipboard sharing, and EIS input
            support.
          </li>
          <li>
            The double-unref fix (#2111) is merged into upstream xdg-desktop-portal and protected by
            a regression test, so the bug cannot silently return.
          </li>
          <li>
            Anyone can extend this work directly from the merged PRs and the interface/autostart
            documentation in the luminous repository.
          </li>
        </ul>
      </section>

      {/* 5 ─ What's left */}
      <section className="mt-12">
        <SectionHeading>What's left to do</SectionHeading>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-foreground/80">
          <li>
            USB portal backend for xdg-desktop-portal-gtk (
            <a
              href="https://github.com/flatpak/xdg-desktop-portal-gtk/pull/545"
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              #545
            </a>
            ) is open, under review.
          </li>
          <li>
            ScreenCast audio stream support (
            <a
              href="https://github.com/flatpak/xdg-desktop-portal/pull/1993"
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              #1993
            </a>
            ) is open; I intend to continue upstream portal work after GSoC ends.
          </li>
          <li>
            EIS input-capture support in sway: KWin (MR 5742) and Mutter (MR 2628) expose physical
            input events over EIS so the InputCapture portal works; sway had no equivalent when I
            wrote this, so luminous's InputCapture portal (sessions, zones, barriers, ConnectToEIS
            are all implemented) cannot actually capture input end-to-end yet. I plan to submit a
            sway PR modeled on those implementations.
          </li>
        </ul>
      </section>
      <section className="mt-12">
        <SectionHeading>Challenges & what I learned</SectionHeading>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-foreground/80">
          <li>
            <strong>Async Rust in a real system service</strong>: calloop and Tokio each want to
            own the event loop; making zbus, Wayland events, and systemd integration coexist took
            careful design, and was the steepest part of the learning curve.
          </li>
          <li>
            <strong>Protocol edge cases</strong>: D-Bus portal APIs look simple until you meet the
            edge cases; reading the protocol, then the code, then the code again became my default
            loop.
          </li>
          <li>
            <strong>The double-unref hunt</strong>: reading surrounding code with a "how does this
            break?" mindset led to a double-free in screencast options handling on invalid
            persistence values: undefined behavior, heap corruption, crashes. A maintainer
            acknowledged it, and my fix plus regression test was merged upstream (#2111).
          </li>
          <li>
            <strong>Regression tests are how fixes stay fixed</strong>: my #2111 fix ships with one, so
            this exact bug cannot silently come back. A bug report without a test is a rumor; a bug report with a
            test is a fix.
          </li>
        </ul>
        <p className="mt-4 text-[15px] leading-7 text-foreground/75">
          A longer narrative write-up of the summer is on my blog:{' '}
          <Link to="/blog/gsoc-2026-xdg-desktop-portals" className="link-underline">
            GSoC 2026: Expanding XDG Desktop Portal Support
          </Link>
          .
        </p>
      </section>

      <section className="mt-12 rounded-md bg-secondary/60 p-5 text-sm leading-7 text-foreground/80">
        <p className="font-medium">Contact</p>
        <p className="mt-1">
          {identity.name} ·{' '}
          <a href={`mailto:${identity.email}`} className="link-underline">
            {identity.email}
          </a>{' '}
          ·{' '}
          <a href={identity.github} target="_blank" rel="noreferrer" className="link-underline">
            github.com/{identity.handle}
          </a>
        </p>
      </section>
    </main>
  )
}
