import {ImageBlock} from '@/components/atoms/image';
import {HeroLink} from '@/components/molecules/hero-link';
import {Technology} from '@/components/organisms/technology';
import {ContactBlock} from '@/components/organisms/contact-block';
import {ContentBlock} from '@/components/organisms/content-block';
import {Footer} from '@/components/organisms/footer';
import {
    Header,
    HeaderMenuColumn,
    MenuAnchor,
    MenuAnchorGroup,
    MenuGroup,
    MenuLink,
} from '@/components/organisms/header';
import {Hero} from '@/components/organisms/hero';
import {LatestPosts} from '@/components/organisms/latest-posts';
import {ServicePageHeader} from '@/components/organisms/service-page-header';
import {Technologies} from '@/components/organisms/technologies';
import {Page} from '@/components/templates/page';
import {apiPlugin, storyblokInit} from '@storyblok/react/rsc';
import {TechnologyContent} from '@/components/molecules/technology-content';
import {Targets} from '@/components/organisms/targets';
import {Target} from '@/components/organisms/target';
import {Steps} from '@/components/organisms/steps';
import {Step} from '@/components/organisms/step';
import {Partners} from '@/components/organisms/partners';
import {Partner} from '@/components/organisms/partner';
import {ContentContainer} from '@/components/molecules/content-contanier';
import {Post} from '@/components/templates/post';
import {UncoverWhatsNew} from '@/components/organisms/uncover-whats-new';
import {JobCard} from '@/components/molecules/job-card';
import {WorkWithUs} from '@/components/organisms/work-with-us';
import {AddressBlock} from '@/components/organisms/address-block';
import {LegalContent} from '@/components/organisms/legal-content';

export const getStoryblokApi = storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_KEY,
    use: [apiPlugin],
    components: {
        page: Page,
        header: Header,
        hero: Hero,
        heroLink: HeroLink,
        contentBlock: ContentBlock,
        imageBlock: ImageBlock,
        contactBlock: ContactBlock,
        footer: Footer,
        latestPosts: LatestPosts,
        servicePageHeader: ServicePageHeader,
        technologies: Technologies,
        technology: Technology,
        technologyContent: TechnologyContent,
        targets: Targets,
        target: Target,
        steps: Steps,
        step: Step,
        partners: Partners,
        partner: Partner,
        contentContainer: ContentContainer,
        post: Post,
        uncoverWhatsNew: UncoverWhatsNew,
        job: JobCard,
        workWithUs: WorkWithUs,
        addressBlock: AddressBlock,
        legalContent: LegalContent,
        headerMenuLink: MenuLink,
        headerMenuAnchor: MenuAnchor,
        headerMenuGroup: MenuGroup,
        headerMenuAnchorGroup: MenuAnchorGroup,
        headerMenuColumn: HeaderMenuColumn,
    },
});
