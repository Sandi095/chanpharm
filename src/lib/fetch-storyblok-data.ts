import {
    ISbResult,
    ISbStoriesParams,
    StoryblokClient,
} from '@storyblok/react/rsc';
import {getStoryblokApi} from './storyblok';

export const fetchStoryblokData = async (slug: string): Promise<ISbResult> => {
    const sbParams: ISbStoriesParams = {
        version:
            process.env.VERCEL_ENV === 'production' ? 'published' : 'draft',
        resolve_relations: ['page.header', 'post.header', 'header.services'],
        resolve_links_level: 2,
        resolve_level: 4,
    };

    const storyblokApi: StoryblokClient = getStoryblokApi();

    return storyblokApi.get(`cdn/stories/${slug}`, sbParams, {
        cache: process.env.VERCEL_ENV === 'production' ? undefined : 'no-store',
    });
};
