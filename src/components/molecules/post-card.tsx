import {StoryblokPost} from '@storyblok/types';
import {Header3} from '../atoms/typography';
import Link from 'next/link';
import {ArrowRight} from '../atoms/icons';
import {format} from 'date-fns';

export type Post = {
    slug: string;
} & StoryblokPost;

export const PostCard = ({post}: {post: Post}) => {
    return (
        <div className="grid grid-cols-1 gap-6 bg-white px-7 py-7 lg:grid-cols-6 lg:gap-0 lg:px-12 lg:pt-12 lg:pb-11">
            {post.publishDate && (
                <div className="text-midnight text-xs font-light lg:text-base">
                    <span className="text-cadmium-red font-bold">:</span>{' '}
                    {format(new Date(post.publishDate), 'MMM dd, yyyy')}
                </div>
            )}
            <div className="col-span-4 flex flex-col gap-5">
                <Header3>{post.title}</Header3>
                <p className="text-midnight text-base leading-6 font-light lg:text-xl lg:leading-[1.875rem]">
                    {post.excerpt}
                </p>
            </div>
            <div className="flex items-end lg:justify-end">
                <Link
                    href={`/${post.slug}`}
                    aria-label={`Read post with the title ${post.title}`}
                    className="text-cadmium-red group hover:bg-cadmium-red border-cadmium-red flex items-center justify-between rounded-full border px-5 py-2 text-base leading-6 hover:text-white lg:px-7 lg:py-3"
                >
                    <ArrowRight className="h-4.5 w-auto group-hover:stroke-white" />
                </Link>
            </div>
        </div>
    );
};
