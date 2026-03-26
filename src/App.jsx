import React from "react";

const iconPaths = {
  layers: {
    viewBox: "0 0 24 24",
    paths: [
      "M12 3 3 7.5 12 12l9-4.5L12 3Z",
      "M3 12.5 12 17l9-4.5",
      "M3 17.5 12 22l9-4.5"
    ]
  },
  file: {
    viewBox: "0 0 24 24",
    paths: [
      "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z",
      "M14 3v5h5",
      "M9 13h6",
      "M9 17h6"
    ]
  },
  globe: {
    viewBox: "0 0 24 24",
    paths: [
      "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0",
      "M12 3a14 14 0 0 1 0 18",
      "M12 3a14 14 0 0 0 0 18",
      "M4 9h16",
      "M4 15h16"
    ]
  },
  book: {
    viewBox: "0 0 24 24",
    paths: [
      "M5 4.5A2.5 2.5 0 0 1 7.5 2H20v17.5H7.5A2.5 2.5 0 0 0 5 22V4.5Z",
      "M5 4.5V22",
      "M8.5 7H16",
      "M8.5 11H16"
    ]
  },
  arrow: {
    viewBox: "0 0 24 24",
    paths: [
      "M5 12h14",
      "m13-5 5 5-5 5"
    ]
  },
  check: {
    viewBox: "0 0 24 24",
    paths: [
      "M20 6 9 17l-5-5"
    ]
  },
  external: {
    viewBox: "0 0 24 24",
    paths: [
      "M14 5h5v5",
      "M10 14 19 5",
      "M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"
    ]
  }
};

function Icon({ name, className = "" }) {
  const icon = iconPaths[name];

  if (!icon) return null;

  return (
    <svg
      viewBox={icon.viewBox}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icon.paths.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
}

function SectionTitle({ eyebrow, title, body }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6B6257]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#241F1A] sm:text-3xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-[#4B443C] sm:text-base">{body}</p>
    </div>
  );
}

function Card({ icon, title, body, children }) {
  return (
    <div className="rounded-3xl border border-[#E9E0D2] bg-white/75 p-5 shadow-[0_8px_30px_rgba(54,42,27,0.05)] backdrop-blur-sm sm:p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4EEE1] text-[#5C5247]">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[#241F1A]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#4B443C]">{body}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

const steps = [
  {
    icon: "layers",
    title: "Start with the template",
    body: "Use this template as the starting point for a simple React page."
  },
  {
    icon: "file",
    title: "Replace one main file",
    body: "Most of the page content can be updated in src/App.jsx."
  },
  {
    icon: "book",
    title: "Read the full setup notes",
    body: "The README covers the full setup, including domain and deployment steps."
  }
];

const details = [
  {
    label: "Main file",
    value: "src/App.jsx"
  },
  {
    label: "Domain",
    value: "if.eugeneyip.com"
  },
  {
    label: "Reference",
    value: "README on GitHub"
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#FCFAF2] text-[#2F2A24] antialiased">
      <main className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <section className="overflow-hidden rounded-[2rem] border border-[#E9E0D2] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(252,250,242,0.92)_100%)] shadow-[0_18px_70px_rgba(54,42,27,0.08)]">
          <div className="grid gap-8 px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-10 lg:py-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E3D8C7] bg-white/85 px-3 py-1.5 text-xs font-medium text-[#5E564C]">
                <span className="h-2 w-2 rounded-full bg-[#A67B5B]" />
                Page Starter
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[#241F1A] sm:text-5xl lg:text-6xl">
                A simple template for publishing a clean React page.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-[#4B443C] sm:text-base">
                This repository provides a simple Page Starter template. For the full setup and publishing instructions, please see the README.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="https://github.com/EugeneYip/if"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2F2A24] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1F1A16]"
                >
                  Open Repository
                  <Icon name="external" className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com/EugeneYip/if#readme"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D9CEBD] bg-white/80 px-5 py-3 text-sm font-medium text-[#2F2A24] transition hover:bg-white"
                >
                  Read the README
                  <Icon name="arrow" className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {details.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[#E9E0D2] bg-white/70 px-4 py-4"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-[#7A6F63]">{item.label}</p>
                    <p className="mt-2 break-all text-sm font-medium text-[#241F1A]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#E9E0D2] bg-white/80 p-4 sm:p-5 lg:p-6">
              <div className="flex items-center justify-between border-b border-[#F0E7DA] pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#7A6F63]">Overview</p>
                  <h2 className="mt-2 text-lg font-semibold text-[#241F1A]">At a glance</h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F4EEE1] text-[#5C5247]">
                  <Icon name="globe" className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-[#FCFAF2] p-4">
                  <p className="text-sm font-medium text-[#241F1A]">A minimal Page Starter template.</p>
                </div>
                <div className="rounded-2xl bg-[#FCFAF2] p-4">
                  <p className="text-sm font-medium text-[#241F1A]">The main page content is usually updated in <span className="font-semibold">src/App.jsx</span>.</p>
                </div>
                <div className="rounded-2xl bg-[#FCFAF2] p-4">
                  <p className="text-sm font-medium text-[#241F1A]">Full instructions are available in the README.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#E9E0D2] bg-white/65 px-5 py-7 shadow-[0_8px_30px_rgba(54,42,27,0.04)] sm:px-8 sm:py-9 lg:px-10">
          <SectionTitle
            eyebrow="How it works"
            title="A simple publishing flow"
            body="This template is meant to be understood quickly. The basic workflow is short, clear, and easy to follow."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {steps.map((step) => (
              <Card key={step.title} icon={step.icon} title={step.title} body={step.body} />
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-[#E9E0D2] bg-white/70 p-5 shadow-[0_8px_30px_rgba(54,42,27,0.04)] sm:p-6">
            <SectionTitle
              eyebrow="Main file"
              title="The main file"
              body="For most simple pages, the main content is updated in one place."
            />

            <div className="mt-6 overflow-hidden rounded-3xl border border-[#ECE2D4] bg-[#1F1A16] text-[#F8F2E8]">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs text-[#CBBEAF]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#B75D69]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D8A04A]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#78987A]" />
                <span className="ml-2">Key file</span>
              </div>
              <div className="px-4 py-5 sm:px-5">
                <pre className="overflow-x-auto text-sm leading-7">
                  <code>{`src/\n  App.jsx`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#E9E0D2] bg-white/70 p-5 shadow-[0_8px_30px_rgba(54,42,27,0.04)] sm:p-6">
            <SectionTitle
              eyebrow="Reference"
              title="Read the README on GitHub"
              body="This page is intentionally brief. The full setup guide is available in the repository README."
            />

            <div className="mt-6 space-y-3">
              {[
                "Repository overview",
                "Setup notes",
                "Domain and deployment"
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-[#EFE5D8] bg-[#FCFAF2] px-4 py-4"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#5C5247]">
                    <Icon name="check" className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-7 text-[#3F382F]">{item}</p>
                </div>
              ))}
            </div>

            <a
              href="https://github.com/EugeneYip/if"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#2F2A24] underline decoration-[#CDBBA5] underline-offset-4 transition hover:text-black"
            >
              https://github.com/EugeneYip/if
              <Icon name="external" className="h-4 w-4" />
            </a>
          </div>
        </section>

        <footer className="mt-10 pb-2 text-center text-sm text-[#6B6257]">
          © 2026 Eugene Yip. <br className="sm:hidden" />All Rights Reserved.
        </footer>
      </main>
    </div>
  );
}
