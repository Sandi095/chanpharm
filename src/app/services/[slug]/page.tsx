import {Metadata, NextPage} from 'next';
import {StoryblokClient, StoryblokStory} from '@storyblok/react/rsc';
import {fetchStoryblokData} from '@/lib/fetch-storyblok-data';
import {getStoryblokApi} from '@/lib/storyblok';

export async function generateStaticParams() {
    const storyblokApi: StoryblokClient = getStoryblokApi();
    const {data} = await storyblokApi.getStories({
        version:
            process.env.VERCEL_ENV === 'production' ? 'published' : 'draft',
        content_type: 'page',
        starts_with: 'services',
        is_startpage: false,
    });

    const slugs = data.stories.map((story) => story.slug);
    return slugs.map((slug) => ({slug}));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{slug: string}>;
}): Promise<Metadata> {
    const {slug} = await params;

    const {data} = await fetchStoryblokData(`/services/${slug}`);

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

const Home = async ({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
    const {data} = await fetchStoryblokData(`/services/${slug}`);
    return <StoryblokStory story={data.story} />;
};

export default Home;
