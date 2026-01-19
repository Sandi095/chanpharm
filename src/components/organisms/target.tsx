import {StoryblokTarget} from '@storyblok/types';
import {Header3} from '@/components/atoms/typography';
import Link from 'next/link';
import {ArrowRight} from '@/components/atoms/icons';
import {StoryblokServerComponent} from '@storyblok/react/rsc';

export const Target = ({blok}: {blok: StoryblokTarget}) => {
    return (
        <div>
            <p className="text-blue-grey text-[2.8125rem] leading-[4.5rem] font-light lg:text-[5rem] lg:leading-[7.8125rem]">
                {String(blok.number).padStart(2, '0')}
            </p>
            <Header3>{blok.title}</Header3>

            <p className="pt-7 text-base leading-6 font-light lg:pt-8 lg:text-xl lg:leading-[1.875rem]">
                {blok.content}
            </p>
        </div>
    );
};
