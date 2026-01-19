import {Metadata} from 'next';
import {fetchStoryblokData} from '@/lib/fetch-storyblok-data';
import {StoryblokStory} from '@storyblok/react/rsc';

import type {Viewport} from 'next';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
    const {data} = await fetchStoryblokData('home');

    const title = data?.story?.content?.metaTitle || 'ChanParm Drug Discovery';
    const description = data?.story?.content?.metaDescription || '';

    return {
        title,
        metadataBase: new URL('https://chanpharm.com'),
        description,

        openGraph: {
            title,
            description,
            type: 'website',
            url: 'https://chanpharm.com',
            locale: 'de',
        },
    };
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

const Home = async () => {
    const {data} = await fetchStoryblokData('home');
    return <StoryblokStory story={data.story} />;
};

export default Home;
