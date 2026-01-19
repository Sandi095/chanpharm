import {StoryblokTechnology} from '@storyblok/types';
import {Header3} from '@/components/atoms/typography';
import Link from 'next/link';
import {ArrowRight} from '@/components/atoms/icons';
import {StoryblokServerComponent} from '@storyblok/react/rsc';

export const Technology = ({blok}: {blok: StoryblokTechnology}) => {
    return (
        <div
            id={blok.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')}
            className="[&:first-child]:pt-10 [&:first-child]:pb-12.5 lg:[&:first-child]:pb-20 [&:last-child]:pb-0 lg:[&:last-child]:pb-0 [&:not(:first-child):not(:last-child)]:py-12.5 lg:[&:not(:first-child):not(:last-child)]:pt-20 lg:[&:not(:first-child):not(:last-child)]:pb-20"
        >
            <p className="text-cadmium-red text-[2.8125rem] leading-[4.5rem] font-light lg:text-[5rem] lg:leading-[7.8125rem]">
                {String(blok.number).padStart(2, '0')}
            </p>
            <Header3>{blok.title}</Header3>

            <div className="py-7 lg:py-10">
                {blok.body?.map((nestedBlok) => (
                    <StoryblokServerComponent
                        blok={nestedBlok}
                        key={nestedBlok._uid}
                    />
                ))}
            </div>

            {blok.callToActionLink && blok.callToActionLabel && (
                <div className="flex justify-end">
                    <Link
                        href={
                            blok.callToActionLink.url ||
                            blok.callToActionLink.cached_url
                        }
                        className="text-cadmium-red group hover:bg-cadmium-red border-cadmium-red flex w-full items-center justify-between rounded-full border px-5 py-2 text-base leading-6 hover:text-white lg:w-md lg:px-7 lg:py-3"
                    >
                        <ArrowRight className="h-3.5 w-auto group-hover:stroke-white lg:h-4.5" />
                        {blok.callToActionLabel}
                    </Link>
                </div>
            )}
        </div>
    );
};
