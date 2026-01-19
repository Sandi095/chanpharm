import {StoryblokTechnologies} from '@storyblok/types';
import {Section} from '../atoms/section';
import {Container} from '../atoms/container';
import {Header2} from '../atoms/typography';
import {
    storyblokEditable,
    StoryblokServerComponent,
} from '@storyblok/react/rsc';

export const Technologies = ({blok}: {blok: StoryblokTechnologies}) => {
    return (
        <Section
            className="bg-background-blue-grey pb-16 lg:mt-14 lg:pb-26"
            {...storyblokEditable(blok)}
        >
            <Container>
                <Header2 className="border-blue-grey border-b pb-10">
                    {blok.title}
                </Header2>

                <div className="divide-blue-grey divide-y lg:px-25.5">
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
