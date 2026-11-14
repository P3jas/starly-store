import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma bez silnika w Rust (engineType = "client") wczytuje plik
  // query_compiler_bg.wasm z dysku w trakcie działania. Next.js nie widzi
  // tego odczytu przy śledzeniu plików, więc na Vercelu brakowało go
  // w funkcjach serwerowych (ENOENT). Dołączamy go jawnie do każdej trasy.
  outputFileTracingIncludes: {
    "/**/*": ["./node_modules/.prisma/client/*.wasm"],
  },
};

export default nextConfig;
