import { baseUrl } from '@/constants/site'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/components`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
    },
  ]
}
