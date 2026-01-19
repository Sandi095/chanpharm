import {StoryblokHero} from '@storyblok/types';
import {HeaderHero} from '../atoms/typography';
import {Container} from '../atoms/container';
import {Section} from '../atoms/section';
import {
    storyblokEditable,
    StoryblokServerComponent,
} from '@storyblok/react/rsc';
import {FadeInUp} from '../atoms/fade-in-up';

export const Hero = ({blok}: {blok: StoryblokHero}) => {
    return (
        <div
            className="transparent-header bg-background-blue-grey relative isolate min-h-screen lg:max-h-screen lg:min-h-0 lg:overflow-hidden"
            {...storyblokEditable(blok)}
        >
            {blok.background?.filename && (
                <div className="absolute inset-0 aspect-square h-full w-full lg:aspect-video">
                    <video
                        poster={blok.poster.filename || undefined}
                        autoPlay
                        muted
                        loop
                        preload="none"
                        className="aspect-square h-auto w-full object-cover object-center lg:aspect-video lg:h-full lg:w-full"
                    >
                        <source src={blok.background.filename} />
                    </video>
                </div>
            )}
            <Container>
                <Section className="relative flex flex-col items-center justify-center space-y-10 pt-28 pb-16 lg:min-h-screen lg:space-y-18 lg:pt-56">
                    <FadeInUp>
                        <HeaderHero className="text-center text-white">
                            {blok.title}
                        </HeaderHero>
                    </FadeInUp>
                    <div className="flex w-full flex-wrap justify-center gap-x-2 gap-y-12 lg:flex-nowrap lg:gap-x-4.5">
                        {blok.links?.map((nestedBlok) => (
                            <StoryblokServerComponent
                                blok={nestedBlok}
                                key={nestedBlok._uid}
                            />
                        ))}
                    </div>
                </Section>
            </Container>
        </div>
    );
};
