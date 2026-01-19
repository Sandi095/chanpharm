import {StoryblokPartners} from '@storyblok/types';
import {Section} from '../atoms/section';
import {Container} from '../atoms/container';
import {Header2} from '../atoms/typography';
import {
    storyblokEditable,
    StoryblokServerComponent,
} from '@storyblok/react/rsc';
import Link from 'next/link';
import {ArrowRight} from '@/components/atoms/icons';

export const Partners = ({blok}: {blok: StoryblokPartners}) => {
    return (
        <Section
            className="bg-white pb-16 lg:pb-26"
            {...storyblokEditable(blok)}
        >
            <Container>
                <Header2 className="border-blue-grey border-b pb-10">
                    {blok.title}
                </Header2>

                <div className="grid-col-1 grid gap-20 py-10 lg:grid-cols-3 lg:gap-32">
                    {blok.items?.map((nestedBlok) => (
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
            </Container>
        </Section>
    );
};
