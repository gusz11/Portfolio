import type { Metadata } from "next";
import { profile } from "@/data/profile";
const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const siteUrl = configured ? new URL(configured).origin : undefined;
export function pageMetadata(
  title: string,
  description: string,
  pathname = "/",
): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(siteUrl ?? "http://localhost:3000"),
    alternates: siteUrl ? { canonical: pathname } : undefined,
    robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
    openGraph: {
      title: `${title} | ${profile.name}`,
      description,
      type: "website",
      locale: "pt_BR",
      siteName: `${profile.name} — Portfólio`,
      ...(siteUrl
        ? {
            url: `${siteUrl}${pathname}`,
            images: [
              {
                url: `${siteUrl}/opengraph-image`,
                width: 1200,
                height: 630,
                alt: "Gustavo Jesus — Desenvolvedor de Software",
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(siteUrl ? { images: [`${siteUrl}/opengraph-image`] } : {}),
    },
  };
}
