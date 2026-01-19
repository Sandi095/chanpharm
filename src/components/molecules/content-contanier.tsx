import {StoryblokContentContainer} from '@storyblok/types';
import {Section} from '../atoms/section';
import {
    storyblokEditable,
    StoryblokServerComponent,
} from '@storyblok/react/rsc';
import {Container} from '../atoms/container';
import {Header3, Header4} from '../atoms/typography';

export const ContentContainer = ({blok}: {blok: StoryblokContentContainer}) => {
    return (
        <Section
            className="bg-background-blue-grey"
            {...storyblokEditable(blok)}
        >
            <Container className="space-y-10 lg:space-y-14 lg:pb-10">
                <Header4 className="text-xl leading-[1.875rem] font-medium lg:text-[1.875rem] lg:leading-[2.375rem]">
                    <span className="text-cadmium-red font-bold">:</span>{' '}
                    {blok.title}
                </Header4>

                {blok.body?.map((nestedBlok) => (
                    <StoryblokServerComponent
                        blok={nestedBlok}
                        key={nestedBlok._uid}
                    />
                ))}
            </Container>
        </Section>
    );
};
