import {
    storyblokEditable,
    StoryblokServerComponent,
} from '@storyblok/react/rsc';
import {StoryblokHeader, StoryblokPage} from '@storyblok/types';
import {Header} from '@/components/organisms/header';

export const Page = ({blok}: {blok: StoryblokPage}) => (
    <main {...storyblokEditable(blok)}>
        {blok.noIndex && <meta name="robots" content="noindex,nofollow" />}
        {blok.header && typeof blok.header !== 'string' && (
            <Header
                blok={blok.header.content as unknown as StoryblokHeader}
                onGreyBackground={blok.headerOnGreyBackground}
            />
        )}
        {blok.body?.map((nestedBlok) => (
            <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
    </main>
);
