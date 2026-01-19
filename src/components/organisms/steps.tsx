import {StoryblokSteps} from '@storyblok/types';
import {Section} from '../atoms/section';
import {Container} from '../atoms/container';
import {Header3} from '../atoms/typography';
import {
    storyblokEditable,
    StoryblokServerComponent,
} from '@storyblok/react/rsc';

export const Steps = ({blok}: {blok: StoryblokSteps}) => {
    return (
        <Section
            className="bg-background-blue-grey pb-16 lg:py-26"
            {...storyblokEditable(blok)}
        >
            <Container className="space-y-10 lg:space-y-13">
                <Header3 className="text-balance">{blok.title}</Header3>

                <div className="grid-col-1 grid gap-8 lg:grid-cols-3 lg:gap-4">
                    {blok.items?.map((nestedBlok) => (
                        <StoryblokServerComponent
                            blok={nestedBlok}
                            key={nestedBlok._uid}
                        />
                    ))}
                </div>
            </Container>
        </Section>
    );
};
