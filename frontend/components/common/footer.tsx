import { Separator } from "../shadcn-ui/separator";
import Logo from "./logo";

import { Montserrat } from "next/font/google";

const mon = Montserrat({
  subsets: ["cyrillic"],
  weight: ["600"],
});

function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      <Separator />
      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <p className="text-sm leading-relaxed">
              © 2025 CardioML <br />
              All rights reserved
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 text-sm md:grid-cols-3">
            {/* Column 1 */}
            <div className="[&>a:hover]:text-primary flex flex-col items-start gap-2">
              <a href="#">Disclaimer</a>
            </div>
            {/* Column 2 */}
            <div className="[&>a:hover]:text-primary flex flex-col gap-2">
              <a href="https://github.com/Keval144/CardioML">Open Source</a>
              <a href="mailto:kevalm144@gmail.com">Contact</a>
            </div>

            {/* Column 3 */}
            <div className="[&>a:hover]:text-primary flex flex-col gap-2">
              <a href="https://x.com/kansagra_keval">Twitter</a>
              <a href="https://in.linkedin.com/in/keval-kansagra-5b77ab286">
                LinkedIn
              </a>
              <a href="https://github.com/Keval144/CardioML">GitHub</a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Wordmark */}
      <div className="pointer-events-none relative inset-x-0 bottom-0 flex justify-center">
        <h1
          className={`bg-linear-to-t from-zinc-900/10 to-zinc-800/0 bg-clip-text text-[5rem] leading-none font-extrabold tracking-tight whitespace-nowrap text-transparent opacity-90 blur-[0.5] select-none sm:text-[7rem] md:text-[9rem] lg:text-[11rem] xl:text-[14rem] dark:from-slate-200/20 dark:to-slate-50/5 ${mon.className}`}
        >
          CardioML
        </h1>
      </div>
    </footer>
  );
}

export default Footer;
