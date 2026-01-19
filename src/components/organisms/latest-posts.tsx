import {StoryblokLatestPosts, StoryblokPost} from '@storyblok/types';
import {Section} from '@/components/atoms/section';
import {Container} from '@/components/atoms/container';
import {Header2} from '@/components/atoms/typography';
import {getStoryblokApi} from '@/lib/storyblok';
import {PostCard} from '@/components/molecules/post-card';
import Link from 'next/link';
import {ArrowRight} from '@/components/atoms/icons';
import {storyblokEditable} from '@storyblok/react/rsc';

export const LatestPosts = async ({blok}: {blok: StoryblokLatestPosts}) => {
    const storyblokApi = getStoryblokApi();
    const {data: postsData} = await storyblokApi.getStories({
        version:
            process.env.VERCEL_ENV === 'production' ? 'published' : 'draft',
        content_type: 'post',
        sort_by: 'content.publishDate:desc',
        per_page: 3,
    });

    const posts = postsData.stories.map((story) => {
        const post = story.content as StoryblokPost;
        return {
            ...post,
            slug: story.full_slug,
        };
    });
    return (
        <Section
            className="bg-background-blue-grey pb-16 lg:pb-26"
            {...storyblokEditable(blok)}
        >
            <Container>
                <Header2 className="text-balance">{blok.title}</Header2>
                <div className="space-y-10 pt-11 lg:space-y-4 lg:pt-20">
                    {posts.map((post) => (
                        <PostCard key={post._uid} post={post} />
                    ))}
                </div>
                {blok.allNewsLink && blok.allNewsLinkLabel && (
                    <div className="flex justify-end pt-10 lg:pt-12">
                        <Link
                            href={
                                blok.allNewsLink.url ||
                                blok.allNewsLink.cached_url
                            }
                            className="text-cadmium-red group hover:bg-cadmium-red border-cadmium-red flex w-lg items-center justify-between rounded-full border px-5 py-2 text-base leading-6 hover:text-white lg:px-7 lg:py-3"
                        >
                            <ArrowRight className="h-4.5 w-auto group-hover:stroke-white" />
                            {blok.allNewsLinkLabel}
                        </Link>
                    </div>
                )}
            </Container>
        </Section>
    );
};
