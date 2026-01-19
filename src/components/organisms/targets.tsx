import {StoryblokTargets} from '@storyblok/types';
import {Section} from '../atoms/section';
import {Container} from '../atoms/container';
import {Header2} from '../atoms/typography';
import {
    storyblokEditable,
    StoryblokServerComponent,
} from '@storyblok/react/rsc';

export const Targets = ({blok}: {blok: StoryblokTargets}) => {
    return (
        <Section
            className="bg-white pb-16 lg:pb-26"
            {...storyblokEditable(blok)}
        >
            <Container>
                <Header2 className="border-blue-grey border-b pb-10">
                    {blok.title}
                </Header2>

                <div className="space-y-7 py-10 lg:space-y-6 lg:px-25.5 lg:pt-12.5 lg:pb-14">
                    <p className="text-midnight text-xl leading-[1.875rem] font-light lg:text-[2rem] lg:leading-[2.625rem]">
                        {blok.intro}
                    </p>
                    <p className="text-midnight text-base leading-6 font-light lg:text-xl lg:leading-[1.875rem]">
                        {blok.content}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-y-7 lg:grid-cols-2 lg:gap-x-4 lg:gap-y-13.5 lg:px-25.5">
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
