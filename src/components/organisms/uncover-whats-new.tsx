'use client';

import {StoryblokUncoverWhatsNew, StoryblokPost} from '@storyblok/types';
import {Section} from '@/components/atoms/section';
import {Container} from '@/components/atoms/container';
import {Header1, Header2} from '@/components/atoms/typography';
import {getStoryblokApi} from '@/lib/storyblok';
import {Post, PostCard} from '@/components/molecules/post-card';
import Link from 'next/link';
import {ArrowDown, ArrowRight} from '@/components/atoms/icons';
import {storyblokEditable} from '@storyblok/react/rsc';
import {Button} from '@headlessui/react';
import {useEffect, useState} from 'react';

export const UncoverWhatsNew = ({blok}: {blok: StoryblokUncoverWhatsNew}) => {
    const storyblokApi = getStoryblokApi();

    const [posts, setPosts] = useState<Post[]>([]);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(
        blok.count ? parseInt(blok.count as string) : 6
    );
    const [page, setPage] = useState(1);

    useEffect(() => {
        const loadData = async () => {
            const {data: postsData, total} = await storyblokApi.getStories({
                version:
                    process.env.VERCEL_ENV === 'production'
                        ? 'published'
                        : 'draft',
                content_type: 'post',
                sort_by: 'content.publishDate:desc',
                per_page: perPage,
                page: page,
            });

            const posts = postsData.stories.map((story) => {
                const post = story.content as StoryblokPost;
                return {
                    ...post,
                    slug: story.full_slug,
                };
            });

            setPosts((prevPosts) => [...prevPosts, ...posts]);
            setTotal(total);
        };

        loadData();
    }, [page, perPage, storyblokApi]);

    const hasMorePages = total > posts.length;

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    return (
        <Section
            className="bg-background-blue-grey py-28 lg:py-32"
            {...storyblokEditable(blok)}
        >
            <Container>
                <Header1 className="text-balance">{blok.title}</Header1>
                <div className="space-y-10 pt-11 lg:space-y-4 lg:pt-17">
                    {posts.map((post) => (
                        <PostCard key={post._uid} post={post} />
                    ))}
                </div>
                {hasMorePages && blok.loadMoreLabel && (
                    <div className="flex justify-end pt-10 lg:pt-12">
                        <Button
                            onClick={handleLoadMore}
                            className="text-cadmium-red group hover:bg-cadmium-red border-cadmium-red flex w-lg items-center justify-between rounded-full border px-5 py-2 text-base leading-6 hover:text-white lg:px-7 lg:py-3"
                        >
                            <ArrowDown className="h-4.5 w-auto group-hover:stroke-white" />
                            {blok.loadMoreLabel}
                        </Button>
                    </div>
                )}
            </Container>
        </Section>
    );
};
