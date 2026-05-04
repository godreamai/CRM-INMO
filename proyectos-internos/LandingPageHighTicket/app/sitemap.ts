import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://godreamai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  return [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    /* {
      url: `${siteUrl}/agenda`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    }, */
    {
      url: `${siteUrl}/sistemadeventa247`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    /* {
      url: `${siteUrl}/agenda-llena`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    }, */
    {
      url: `${siteUrl}/privacidad`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terminos`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}

