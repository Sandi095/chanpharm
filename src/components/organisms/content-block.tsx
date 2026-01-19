import {StoryblokContentBlock} from '@storyblok/types';
import {Header2} from '@/components/atoms/typography';
import {Container} from '@/components/atoms/container';
import {Section} from '@/components/atoms/section';
import Link from 'next/link';
import {ArrowRight} from '@/components/atoms/icons';
import {richTextResolver, storyblokEditable} from '@storyblok/react/rsc';
import {
    convertAttributesInElement,
    options,
} from '@/components/richt-text-render';
import {ReactElement} from 'react';
import {cn} from '@/lib/utils';
import Image from 'next/image';

export const ContentBlock = ({blok}: {blok: StoryblokContentBlock}) => {
    const html = blok.content
        ? convertAttributesInElement(
              richTextResolver<ReactElement>(options).render(
                  blok.content as any
              )
          )
        : null;

    const imageDimension = blok.image?.filename
        ? blok.image.filename.split('/')[5].split('x')
        : [];

    const image = blok.image
        ? {
              src: blok.image.filename,
              alt: blok.image.alt,
              width: parseInt(imageDimension[0]),
              height: parseInt(imageDimension[1]),
          }
        : null;

    return (
        <Section
            {...storyblokEditable(blok)}
            className={cn('lg:py-17', blok.usedAsHeader && 'pt-28 lg:pt-32')}
        >
            <Container className={cn('', blok.boxed && 'lg:px-25.5')}>
                {blok.title && (
                    <Header2 className="border-blue-grey border-b pb-10">
                        {blok.title}
                    </Header2>
                )}
                <div
                    className={cn(
                        'grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-0',
                        blok.title && 'pt-10 lg:pt-12'
                    )}
                >
                    {blok.intro && (
                        <div
                            className={cn(
                                'text-midnight text-xl leading-[1.875rem] font-light text-balance lg:pr-28 lg:text-[2rem] lg:leading-12',
                                blok.boxed && 'lg:pr-14'
                            )}
                        >
                            {blok.intro}
                        </div>
                    )}
                    {image && image.src && (
                        <div className="flex h-40 w-auto items-start lg:h-60 lg:justify-end">
                            <Image
                                src={image?.src}
                                alt={image?.alt || blok.label}
                                width={image?.width}
                                height={image?.height}
                                className="h-40 w-auto object-contain object-center lg:h-60"
                            />
                        </div>
                    )}
                    {!image && blok.content && (
                        <div className="text-midnight leading-6 font-light lg:text-xl lg:leading-[1.875rem] [&_li>p]:pb-0 [&_p]:pb-4 [&_p:has(+ul)]:pb-0">
                            {html}
                        </div>
                    )}
                </div>
                {blok.callToActionLink && blok.callToActionLabel && (
                    <div className="flex justify-end pt-10 lg:pt-8">
                        <Link
                            href={
                                blok.callToActionLink.url ||
                                blok.callToActionLink.cached_url
                            }
                            className="text-cadmium-red group hover:bg-cadmium-red border-cadmium-red flex w-md items-center justify-between rounded-full border px-5 py-2 text-base leading-6 hover:text-white lg:px-7 lg:py-3"
                        >
                            <ArrowRight className="h-4.5 w-auto group-hover:stroke-white" />
                            {blok.callToActionLabel}
                        </Link>
                    </div>
                )}
            </Container>
        </Section>
    );
};
