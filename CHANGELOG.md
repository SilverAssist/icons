# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2026-08-24

### Fixed

- **Two open Dependabot security alerts on dev-only transitive deps** — js-yaml 4.3.0 (via `@eslint/eslintrc`): CVE-2026-59870 quadratic CPU consumption, patched at 4.3.1; esbuild 0.28.0 (via `tsx`): arbitrary file read on the dev server, patched at 0.28.1. Neither is shipped in the published package. Pinned via `package.json` `overrides`.

### Changed

- Normalized the `license` field to its SPDX identifier.
