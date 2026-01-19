import {cn} from '@/lib/utils';

import {ReactNode} from 'react';

export const Section = ({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) => {
    return (
        <section className={cn('px-6 py-10 lg:py-20', className)}>
            {children}
        </section>
    );
};
