import {StoryblokLegalContent} from '@storyblok/types';
import {Section} from '@/components/atoms/section';
import {richTextResolver, storyblokEditable} from '@storyblok/react/rsc';
import {Container} from '../atoms/container';
import {Header1} from '../atoms/typography';
import {
    convertAttributesInElement,
    options,
} from '@/components/richt-text-render';
import {ReactElement} from 'react';

export const LegalContent = ({blok}: {blok: StoryblokLegalContent}) => {
    const html = blok.content
        ? convertAttributesInElement(
              richTextResolver<ReactElement>(options).render(
                  blok.content as any
              )
          )
        : null;

    return (
        <Section
            className="bg-white py-28 lg:py-32"
            {...storyblokEditable(blok)}
        >
            <Container className="space-y-10">
                <Header1 className="text-xl leading-[1.875rem] font-medium lg:text-[1.875rem] lg:leading-[2.375rem]">
                    <span className="text-cadmium-red font-bold">:</span>{' '}
                    {blok.title}
                </Header1>
                <div className="text-midnight text-xl leading-[1.875rem] font-light [&_li>p]:pb-0 [&_p]:pb-4 [&_p:has(+ul)]:pb-0">
                    {html}
                </div>
            </Container>
        </Section>
    );
};
