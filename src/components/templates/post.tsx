import {
    richTextResolver,
    storyblokEditable,
    StoryblokServerComponent,
} from '@storyblok/react/rsc';
import {StoryblokHeader, StoryblokPost} from '@storyblok/types';
import {Section} from '@/components/atoms/section';
import {Container} from '@/components/atoms/container';
import Link from 'next/link';
import {ArrowRight} from '@/components/atoms/icons';
import {format} from 'date-fns';
import {Header1} from '@/components/atoms/typography';
import {ReactElement} from 'react';
import {convertAttributesInElement, options} from '../richt-text-render';
import {Header} from '../organisms/header';

export const Post = ({blok}: {blok: StoryblokPost}) => {
    const html = blok.content
        ? convertAttributesInElement(
              richTextResolver<ReactElement>(options).render(
                  blok.content as any
              )
          )
        : null;
    return (
        <main {...storyblokEditable(blok)} className="bg-background-blue-grey">
            {blok.header && typeof blok.header !== 'string' && (
                <Header
                    blok={blok.header.content as unknown as StoryblokHeader}
                    onGreyBackground
                />
            )}
            <Section className="pt-28 pb-20 lg:pt-40 lg:pb-26">
                <Container className="bg-white p-8 lg:px-26 lg:py-17">
                    <div className="flex items-center justify-between">
                        <Link
                            href={`/posts`}
                            aria-label={`Back to all news`}
                            className="text-cadmium-red group hover:bg-cadmium-red border-cadmium-red flex items-center justify-between gap-10 rounded-full border px-5 py-2 text-base leading-6 hover:text-white lg:px-7 lg:py-3"
                        >
                            <ArrowRight className="h-4.5 w-auto rotate-180 group-hover:stroke-white" />
                            <span className="hidden lg:block">
                                Back to All News
                            </span>
                        </Link>

                        {blok.publishDate && (
                            <div className="text-midnight text-xs font-light lg:text-base">
                                <span className="text-cadmium-red font-bold">
                                    :
                                </span>{' '}
                                {format(
                                    new Date(blok.publishDate),
                                    'MMM dd, yyyy'
                                )}
                            </div>
                        )}
                    </div>
                    <Header1 className="py-8 text-xl leading-[1.875rem] font-medium lg:pt-17 lg:pb-10 lg:text-[2rem] lg:leading-[2.5rem]">
                        {blok.title}
                    </Header1>

                    <div className="text-midnight text-base leading-6 lg:text-xl lg:leading-[1.875rem] [&_li>p]:pb-0 [&_p]:pb-4 [&_p:has(+ul)]:pb-0">
                        {html}
                    </div>
                </Container>
            </Section>
            {blok.footer?.map((nestedBlok) => (
                <StoryblokServerComponent
                    blok={nestedBlok}
                    key={nestedBlok._uid}
                />
            ))}
        </main>
    );
};
