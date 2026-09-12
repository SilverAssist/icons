import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

const Home = lazy(() => import("@/pages/home").then((m) => ({ default: m.Home })));
const IconsIndex = lazy(() =>
  import("@/pages/icons-index").then((m) => ({ default: m.IconsIndex })),
);
const IconDetail = lazy(() =>
  import("@/pages/icon-detail").then((m) => ({ default: m.IconDetail })),
);
const NotFound = lazy(() => import("@/pages/not-found").then((m) => ({ default: m.NotFound })));

export default function App() {
  return (
    <div className="bg-grid flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/icons" element={<IconsIndex />} />
            <Route path="/icons/:slug" element={<IconDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
