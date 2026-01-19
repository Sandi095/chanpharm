import {getStoryblokApi} from '@/lib/storyblok';
import {StoryblokClient} from '@storyblok/react/rsc';
import {parseISO} from 'date-fns';
import type {MetadataRoute} from 'next';

const version = process.env.VERCEL_ENV === 'production' ? 'published' : 'draft';
const per_page = 25;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const storyblokApi: StoryblokClient = getStoryblokApi();
    const {data, total} = await storyblokApi.getStories({
        version,
        content_type: 'page',
        per_page,
        page: 1,
    });

    const siteMap: MetadataRoute.Sitemap = data.stories.map((story) => ({
        url: `https://chanpharm.com//${story.slug === 'home' ? '' : story.slug}`,
        lastModified: parseISO(
            story.published_at || story.updated_at || story.created_at
        ),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    if (total > 25) {
        const pages = Math.ceil(total / 25);
        for await (const i of Array.from(
            {length: pages - 1},
            (_, i) => i + 2
        )) {
            const {data: morePageData} = await storyblokApi.getStories({
                version,
                content_type: 'page',
                per_page,
                page: i,
            });
            const morePages: MetadataRoute.Sitemap = morePageData.stories.map(
                (story) => ({
                    url: `https://chanpharm.com/${story.slug === 'home' ? '' : story.slug}`,
                    lastModified: parseISO(
                        story.published_at ||
                            story.updated_at ||
                            story.created_at
                    ),
                    changeFrequency: 'monthly',
                    priority: 0.8,
                })
            );
            siteMap.push(...morePages);
        }
    }

    return siteMap;
}
