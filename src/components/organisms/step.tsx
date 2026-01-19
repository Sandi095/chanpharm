import {StoryblokStep} from '@storyblok/types';
import {Header3, Header4} from '@/components/atoms/typography';
import Link from 'next/link';
import {ArrowRight} from '@/components/atoms/icons';
import {StoryblokServerComponent} from '@storyblok/react/rsc';

export const Step = ({blok}: {blok: StoryblokStep}) => {
    return (
        <div className="bg-midnight flex flex-col justify-between gap-14 rounded-xl px-9 py-9 lg:gap-17 lg:px-10 lg:py-11">
            <div>
                <p className="text-electric-lemon text-center text-[2.8125rem] leading-[4.5rem] font-light lg:text-[5rem] lg:leading-[7.8125rem]">
                    {String(blok.number).padStart(2, '0')}
                </p>
                <Header4 className="text-center text-xl leading-[1.875rem] font-light text-white lg:text-[2rem] lg:leading-[2.625rem]">
                    {blok.title}
                </Header4>
            </div>
            <div className="divide-electric-lemon border-y-electric-lemon divide-y border-y">
                {blok.subSteps?.split(',').map((subStep) => (
                    <p
                        className="py-4 text-center text-base leading-6 font-light text-white lg:py-5 lg:text-xl lg:leading-[1.875rem]"
                        key={subStep}
                    >
                        {subStep}
                    </p>
                ))}
            </div>
        </div>
    );
};
