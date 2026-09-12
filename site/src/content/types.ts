export interface IconMeta {
  slug: string;
  componentName: string;
  displayName: string;
  unnamed: boolean;
  defaultWidth: number;
  defaultHeight: number;
  defaultFill: string;
  defaultStroke: string | null;
  hasStroke: boolean;
}

export interface GeneratedContent {
  generatedAt: string;
  meta: {
    name: string;
    version: string;
    description: string;
    repository: string;
    homepage: string;
    license: string;
  };
  counts: {
    total: number;
    named: number;
    unnamed: number;
  };
  icons: IconMeta[];
}
