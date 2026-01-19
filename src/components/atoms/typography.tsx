import {cn} from '@/lib/utils';
import {ReactNode} from 'react';

export const HeaderHero = ({
    id,
    className,
    children,
    ...props
}: {
    id?: string;
    className?: string;
    children: ReactNode;
}) => {
    return (
        <h1
            className={cn(
                'text-[2.8125rem] leading-[3.125rem] font-semibold hyphens-manual md:hyphens-none lg:text-[5rem] lg:leading-[5.313rem]',
                className
            )}
            {...props}
        >
            {children}
        </h1>
    );
};

export const Header1 = ({
    id,
    className,
    children,
    ...props
}: {
    id?: string;
    className?: string;
    children: ReactNode;
}) => {
    return (
        <h1
            className={cn(
                'text-midnight text-[2.8125rem] leading-[3.125rem] font-light hyphens-manual md:hyphens-none lg:text-[5rem] lg:leading-[5.313rem]',
                className
            )}
            {...props}
        >
            {children}
        </h1>
    );
};

export const Header2 = ({
    className,
    children,
    ...props
}: {
    className?: string;
    children: ReactNode;
}) => {
    return (
        <h2
            className={cn(
                'text-midnight text-[2.8125rem] leading-[3.125rem] font-light hyphens-auto md:hyphens-none lg:text-[5rem] lg:leading-[5.3125rem]',
                className
            )}
            {...props}
        >
            {children}
        </h2>
    );
};

export const Header3 = ({
    id,
    className,
    children,
    ...props
}: {
    id?: string;
    className?: string;
    children: ReactNode;
}) => {
    return (
        <h3
            id={id}
            className={cn(
                'text-midnight text-xl leading-[1.875rem] font-medium hyphens-auto md:hyphens-none lg:text-[2rem] lg:leading-[2.625rem]',
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
};

export const Header4 = ({
    className,
    children,
    ...props
}: {
    className?: string;
    children: ReactNode;
}) => {
    return (
        <h3
            className={cn(
                'text-midnight text-base leading-6 font-bold hyphens-auto md:hyphens-none lg:text-xl lg:leading-[1.875rem]',
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
};

export const CopyLarge = ({
    className,
    children,
    ...props
}: {
    className?: string;
    children: ReactNode;
}) => {
    return (
        <p className={cn('', className)} {...props}>
            {children}
        </p>
    );
};

export const Paragraph = ({
    className,
    children,
    ...props
}: {
    className?: string;
    children: ReactNode;
}) => {
    return (
        <p className={cn('', className)} {...props}>
            {children}
        </p>
    );
};
