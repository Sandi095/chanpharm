import {StoryblokTechnologyContent} from '@storyblok/types';
import {Header3, Header4} from '@/components/atoms/typography';
import Link from 'next/link';
import {ArrowRight} from '@/components/atoms/icons';
import Image from 'next/image';
import {cn} from '@/lib/utils';

export const TechnologyContent = ({
    blok,
}: {
    blok: StoryblokTechnologyContent;
}) => {
    const imageDimension = blok.image?.filename
        ? blok.image.filename.split('/')[5].split('x')
        : [];

    const image = blok.image?.filename
        ? {
              src: blok.image.filename,
              alt: blok.image.alt,
              width: parseInt(imageDimension[0]),
              height: parseInt(imageDimension[1]),
          }
        : null;

    return (
        <div className="pb-5">
            {blok.header && (
                <Header4 className="pb-5 uppercase">{blok.header}</Header4>
            )}
            <div
                className={cn(
                    'grid grid-cols-1',
                    image &&
                        blok.imagePosition !== 'full' &&
                        'lg:grid-cols-2 lg:gap-32'
                )}
            >
                {blok.content && (
                    <p
                        className={cn(
                            'text-midnight text-base leading-6 font-light lg:text-xl lg:leading-[1.875rem]',
                            image && blok.imagePosition === 'left' && 'order-2',
                            image && blok.imagePosition === 'right' && 'order-1'
                        )}
                    >
                        {blok.content}
                    </p>
                )}
                {image && image.src && (
                    <Image
                        src={image?.src}
                        alt={image?.alt || blok.label}
                        width={image?.width}
                        height={image?.height}
                        className={cn(
                            'object-contain object-center py-4 lg:py-0',
                            blok.imagePosition === 'left' && 'order-1',
                            blok.imagePosition === 'right' && 'order-2',
                            blok.imagePosition === 'full' && 'pt-5 lg:pt-5'
                        )}
                    />
                )}
            </div>
        </div>
    );
};
