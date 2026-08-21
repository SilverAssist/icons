// NOTE: no "use client" here, and that is the assertion.
//
// These icons are pure SVG functions -- no hooks, no state, no browser APIs.
// They must therefore render *entirely on the server*, with no client
// boundary and no JavaScript shipped for them. That is the property this
// fixture protects: if someone adds a hook to an icon, or the build starts
// stamping a "use client" directive, this page turns those icons into client
// components and silently ships JS for what should be static markup.
//
// The sibling packages needed the opposite proof -- that a directive was
// present. Here its *absence* is the contract.
import { AssistedLivingSVG, HomeCareSVG, MemoryCareSVG } from "@silverassist/icons";

export default function Page() {
  return (
    <main>
      <h1>icons fixture</h1>
      <div data-testid="icon-grid">
        <AssistedLivingSVG data-testid="icon-assisted-living" />
        <HomeCareSVG data-testid="icon-home-care" width={48} height={48} />
        <MemoryCareSVG data-testid="icon-memory-care" fill="#ff0000" />
      </div>
    </main>
  );
}
