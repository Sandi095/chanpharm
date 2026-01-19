'use client';

import {
    StoryblokUncoverWhatsNew,
    StoryblokPost,
    StoryblokWorkWithUs,
} from '@storyblok/types';
import {Section} from '@/components/atoms/section';
import {Container} from '@/components/atoms/container';
import {Header1, Header2, Header4} from '@/components/atoms/typography';
import {getStoryblokApi} from '@/lib/storyblok';
import {Post, PostCard} from '@/components/molecules/post-card';
import Link from 'next/link';
import {ArrowDown, ArrowRight} from '@/components/atoms/icons';
import {
    storyblokEditable,
    StoryblokServerComponent,
} from '@storyblok/react/rsc';
import {Header} from './header';

export const WorkWithUs = ({blok}: {blok: StoryblokWorkWithUs}) => {
    return (
        <Section
            className="bg-background-blue-grey pt-28 pb-16 lg:pt-32 lg:pb-26"
            {...storyblokEditable(blok)}
        >
            <Container className="space-y-10 lg:space-y-14">
                <Header1>{blok.title}</Header1>
                <Header4 className="font-medium lg:text-[1.875rem] lg:leading-[2.375rem]">
                    <span className="text-cadmium-red font-bold">:</span>{' '}
                    {blok.openPositionsLabel}
                </Header4>

                {blok.items?.map((nestedBlok) => (
                    <StoryblokServerComponent
                        blok={nestedBlok}
                        key={nestedBlok._uid}
                    />
                ))}
            </Container>
        </Section>
    );
};
