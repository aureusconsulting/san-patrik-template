'use client';

import { createContext, useContext } from 'react';
import { content as defaults } from './content';

// PageContent mirrors the shape of content.ts — all fields optional from Sanity's perspective
export type PageContent = typeof defaults;

const ContentContext = createContext<PageContent>(defaults);

export const ContentProvider = ContentContext.Provider;

export function usePageContent(): PageContent {
  return useContext(ContentContext);
}
