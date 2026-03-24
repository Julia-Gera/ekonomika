const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchFromStrapi<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api/${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch error: ${res.status}`);
  }

  return res.json();
}

export async function getArticles(limit = 10, page = 1) {
  try {
    const data = await fetchFromStrapi<any>('articles', {
      'populate': 'cover',
      'pagination[pageSize]': limit.toString(),
      'pagination[page]': page.toString(),
      'sort': 'publishedAt:desc',
    });
    return data;
  } catch {
    return { data: [], meta: { pagination: { total: 0, page: 1, pageSize: limit, pageCount: 0 } } };
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const data = await fetchFromStrapi<any>('articles', {
      'filters[slug][$eq]': slug,
      'populate': '*',
    });
    return data.data?.[0] || null;
  } catch {
    return null;
  }
}

export async function getServices(limit = 20) {
  try {
    const data = await fetchFromStrapi<any>('services', {
      'populate': 'icon',
      'pagination[pageSize]': limit.toString(),
      'sort': 'order:asc',
    });
    return data;
  } catch {
    return { data: [] };
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    const data = await fetchFromStrapi<any>('services', {
      'filters[slug][$eq]': slug,
      'populate': '*',
    });
    return data.data?.[0] || null;
  } catch {
    return null;
  }
}
