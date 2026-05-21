import { sanityClient } from './client';
import { content as defaults } from '@/lib/content';
import type { PageContent } from '@/lib/content-context';

const QUERY = `*[_type == "siteSettings"][0]`;

// Deep-merge: Sanity values override defaults, missing Sanity keys fall back to defaults
function merge<T extends object>(base: T, override: Partial<T> | null | undefined): T {
  if (!override) return base;
  const result = { ...base };
  for (const key of Object.keys(override) as (keyof T)[]) {
    const val = override[key];
    if (val === null || val === undefined) continue;
    if (
      typeof val === 'object' &&
      !Array.isArray(val) &&
      typeof base[key] === 'object' &&
      !Array.isArray(base[key])
    ) {
      result[key] = merge(base[key] as object, val as object) as T[keyof T];
    } else {
      result[key] = val as T[keyof T];
    }
  }
  return result;
}

export async function fetchSiteContent(): Promise<PageContent> {
  // If no project ID, return defaults immediately (works with empty .env.local)
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return defaults as PageContent;
  }

  try {
    const raw = await sanityClient.fetch(QUERY, {}, { next: { revalidate: 60 } });
    if (!raw) return defaults as PageContent;

    // Resolve Sanity image URL for agent photo
    let agentImageSrc = defaults.agent.imageSrc;
    if (raw.agent?.photo?.asset?._ref) {
      const ref: string = raw.agent.photo.asset._ref;
      // ref format: image-{id}-{dimensions}-{format}
      const id = ref.replace(/^image-/, '').replace(/-(\d+x\d+)-(\w+)$/, '/$1.$2');
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
      agentImageSrc = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}`;
    }

    const sanityContent: Partial<PageContent> = {
      ...(raw.seo && {
        meta: merge(defaults.meta, raw.seo),
      }),
      ...(raw.hero && {
        hero: merge(defaults.hero, raw.hero),
      }),
      ...(raw.project && {
        project: merge(defaults.project, raw.project),
      }),
      ...(raw.investment && {
        investment: merge(defaults.investment, raw.investment),
      }),
      ...(raw.agent && {
        agent: merge(defaults.agent, {
          ...raw.agent,
          imageSrc: agentImageSrc,
          imageAlt: raw.agent.photoAlt ?? defaults.agent.imageAlt,
          whatsappUrl: raw.agent.phone
            ? `https://wa.me/${raw.agent.phone.replace(/\D/g, '')}`
            : defaults.agent.whatsappUrl,
        }),
      }),
      ...(raw.villas?.length && {
        villas: defaults.villas.map((v) => {
          const override = (raw.villas as Array<{typeId: string; price?: string; soldOut?: boolean; imageAlt?: string}>)
            .find((s) => s.typeId === v.typeId);
          return override ? { ...v, ...override } : v;
        }),
      }),
      ...(raw.ctaLabel && {
        nav: { ...defaults.nav, ctaLabel: raw.ctaLabel },
      }),
    };

    return merge(defaults as PageContent, sanityContent);
  } catch {
    // Network error or Sanity down — serve defaults silently
    return defaults as PageContent;
  }
}
