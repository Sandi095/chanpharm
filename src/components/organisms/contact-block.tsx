import {StoryblokContactBlock} from '@storyblok/types';
import {Section} from '../atoms/section';
import {Container} from '../atoms/container';
import {Header2} from '../atoms/typography';
import {storyblokEditable} from '@storyblok/react/rsc';
import {cn} from '@/lib/utils';
import Link from 'next/link';

export const ContactBlock = ({blok}: {blok: StoryblokContactBlock}) => {
    return (
        <Section
            className={cn(
                'pb-16',
                blok.background === 'red' &&
                    blok.variant !== 'box' &&
                    'bg-cadmium-red',
                blok.background === 'yellow' &&
                    blok.variant !== 'box' &&
                    'bg-electric-lemon',
                blok.variant === 'header' && 'pt-40 pb-20 lg:pt-60 lg:pb-32',
                blok.noTopPadding && 'pt-0 lg:pt-0',
                blok.noBottomPadding && 'pb-0 lg:pb-0',
                blok.inContainer && 'px-0'
            )}
            {...storyblokEditable(blok)}
        >
            <Container
                className={cn(
                    'grid-col-1 grid items-center lg:grid-cols-2',
                    blok.background === 'red' &&
                        blok.variant === 'box' &&
                        'bg-cadmium-red rounded-xl text-white',
                    blok.background === 'yellow' &&
                        blok.variant === 'box' &&
                        'text-midnight bg-electric-lemon rounded-xl',
                    blok.variant === 'box' &&
                        'items-start px-7.5 pt-7.5 pb-12 lg:px-25 lg:py-20'
                )}
            >
                <Header2
                    className={cn(
                        'pr-10 pb-11 text-balance lg:pb-0',
                        blok.background === 'red' && 'text-white',
                        blok.background === 'yellow' && 'text-midnight',
                        blok.variant === 'box' &&
                            'pb-8 text-xl leading-[1.875rem] lg:text-[2rem] lg:leading-[2.625rem]'
                    )}
                >
                    {blok.title}
                </Header2>
                <div
                    className={cn(
                        'grid grid-cols-1 grid-rows-2 items-center divide-y border-t text-xl font-light lg:text-[2rem]',
                        blok.background === 'red' &&
                            'divide-white border-white text-white',
                        blok.background === 'yellow' &&
                            'divide-midnight border-midnight text-midnight',
                        blok.variant === 'box' &&
                            'text-base leading-6 lg:text-xl lg:leading-[1.875rem]'
                    )}
                >
                    <p
                        className={cn(
                            'flex items-center py-8 lg:h-full lg:py-10',
                            blok.variant === 'box' && 'py-4 lg:py-7'
                        )}
                    >
                        <Link href={`mailto:${blok.email}`}>{blok.email}</Link>
                    </p>
                    <p
                        className={cn(
                            'hidden items-center py-10 lg:flex lg:h-full',
                            blok.variant === 'box' && 'py-4 lg:py-7'
                        )}
                    >
                        <Link href={`tel:${blok.phone1}`}>{blok.phone1}</Link>
                        {blok.phone2 ? (
                            <>
                                <span className="mx-2">|</span>
                                <Link href={`tel:${blok.phone2}`}>
                                    {blok.phone2}
                                </Link>
                            </>
                        ) : (
                            ''
                        )}
                    </p>
                    <p
                        className={cn(
                            'items-center border-b py-8 lg:hidden lg:h-full',
                            blok.variant === 'box' && 'py-4 lg:py-7',
                            blok.background === 'red' && 'border-white',
                            blok.background === 'yellow' && 'border-midnight'
                        )}
                    >
                        <Link href={`tel:${blok.phone1}`}>{blok.phone1}</Link>
                        {blok.phone2 ? (
                            <>
                                <br />
                                <Link href={`tel:${blok.phone2}`}>
                                    {blok.phone2}
                                </Link>
                            </>
                        ) : (
                            ''
                        )}
                    </p>
                </div>
            </Container>
        </Section>
    );
};
