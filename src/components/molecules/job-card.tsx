import {StoryblokJob} from '@storyblok/types';
import {Header3} from '../atoms/typography';
import Link from 'next/link';
import {ArrowRight} from '../atoms/icons';
import {format} from 'date-fns';

export const JobCard = ({blok}: {blok: StoryblokJob}) => {
    return (
        <div className="grid grid-cols-1 gap-6 bg-white px-7 py-7 lg:grid-cols-8 lg:gap-0 lg:px-12 lg:pt-12 lg:pb-11">
            <div className="text-midnight text-xs font-light lg:text-base">
                <span className="text-cadmium-red font-bold">:</span>{' '}
                {format(new Date(blok.publishDate), 'MMM dd, yyyy')}
            </div>
            <div className="flex flex-col gap-5 lg:col-span-5">
                <Header3>{blok.title}</Header3>
                <p className="text-midnight text-base leading-6 font-light lg:text-xl lg:leading-[1.875rem]">
                    {blok.excerpt}
                </p>
            </div>
            <div className="flex items-end lg:col-span-2 lg:justify-end">
                <Link
                    href={
                        blok.moreDetailsLink.url ||
                        blok.moreDetailsLink.cached_url
                    }
                    aria-label={`More details about the job with the title ${blok.title}`}
                    className="text-cadmium-red group hover:bg-cadmium-red border-cadmium-red flex items-center justify-between gap-5 rounded-full border px-5 py-2 text-base leading-6 hover:text-white lg:px-7 lg:py-3"
                >
                    <ArrowRight className="h-4.5 w-auto group-hover:stroke-white" />

                    {blok.moreDetailsLabel}
                </Link>
            </div>
        </div>
    );
};
